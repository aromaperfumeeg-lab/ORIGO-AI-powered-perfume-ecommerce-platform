[CmdletBinding()]
param(
  [ValidateRange(1, 65535)]
  [int]$Port = 4173,

  [string]$Model = "gpt-5.4-mini",

  [ValidateRange(5, 30)]
  [int]$StartupTimeoutSeconds = 30,

  [string]$DatabasePath = "",

  [switch]$ProbeOnly
)

$ErrorActionPreference = "Stop"
$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$serverFile = Join-Path $root "server.mjs"
$stdoutLog = Join-Path $root ".origo-server.stdout.log"
$stderrLog = Join-Path $root ".origo-server.stderr.log"
$pidFile = Join-Path $root ".origo-server.pid"
$healthUrl = "http://127.0.0.1:$Port/api/health"

function Write-LogTail {
  param([string]$Label, [string]$Path)
  Write-Host "`n--- $Label (last 80 lines) ---" -ForegroundColor Yellow
  if (Test-Path -LiteralPath $Path) {
    Get-Content -LiteralPath $Path -Tail 80
  } else {
    Write-Host "Log file was not created: $Path"
  }
}

function Stop-ProcessSafely {
  param([int]$ProcessId, [string]$Reason)
  $process = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
  if (-not $process) { return }
  Write-Host "Stopping PID $ProcessId ($Reason)..." -ForegroundColor DarkYellow
  Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
  try { Wait-Process -Id $ProcessId -Timeout 3 -ErrorAction Stop } catch {}
}

function Get-PortOwner {
  param([int]$LocalPort)
  $line = netstat -ano -p tcp |
    Select-String -Pattern "^\s*TCP\s+\S+:$LocalPort\s+\S+\s+LISTENING\s+\d+\s*$" |
    Select-Object -First 1
  if (-not $line) { return $null }
  $parts = ($line.Line -split "\s+") | Where-Object { $_ }
  if ($parts.Count -lt 5) { return $null }
  return [int]$parts[-1]
}

if (-not (Test-Path -LiteralPath $serverFile)) {
  throw "server.mjs was not found at: $serverFile"
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $HOME ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if ($nodeCommand) {
  $nodeCommand.Source
} elseif (Test-Path -LiteralPath $bundledNode) {
  $bundledNode
} else {
  $null
}

if (-not $node) {
  throw "Node.js is required. Install Node.js 20+ or run inside Codex Desktop."
}

# Stop the last ORIGO process recorded by this script.
if (Test-Path -LiteralPath $pidFile) {
  $savedPid = 0
  [void][int]::TryParse((Get-Content -LiteralPath $pidFile -Raw).Trim(), [ref]$savedPid)
  if ($savedPid -gt 0) { Stop-ProcessSafely -ProcessId $savedPid -Reason "saved ORIGO PID" }
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

# The user requested that this port be released before startup.
$portOwner = Get-PortOwner -LocalPort $Port
if ($portOwner) {
  Stop-ProcessSafely -ProcessId $portOwner -Reason "port $Port listener"
}

$remainingOwner = Get-PortOwner -LocalPort $Port
if ($remainingOwner) {
  throw "Port $Port is still occupied by PID $remainingOwner."
}

$env:ORIGO_PORT = [string]$Port
$env:OPENAI_MODEL = $Model
if ($DatabasePath) {
  $env:ORIGO_DB_PATH = [System.IO.Path]::GetFullPath($DatabasePath)
}

Remove-Item -LiteralPath $stdoutLog -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $stderrLog -Force -ErrorAction SilentlyContinue

Write-Host "Starting ORIGO on port $Port..." -ForegroundColor Cyan
$process = Start-Process `
  -FilePath $node `
  -ArgumentList @("server.mjs") `
  -WorkingDirectory $root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $stdoutLog `
  -RedirectStandardError $stderrLog `
  -PassThru

Set-Content -LiteralPath $pidFile -Value $process.Id -Encoding ascii

$watch = [System.Diagnostics.Stopwatch]::StartNew()
$lastError = ""
$ready = $false

while ($watch.Elapsed.TotalSeconds -lt $StartupTimeoutSeconds) {
  $process.Refresh()
  if ($process.HasExited) {
    $lastError = "Node exited during startup with code $($process.ExitCode)."
    break
  }

  try {
    $health = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 2
    if ($health.ok -eq $true) {
      $ready = $true
      break
    }
    $lastError = "Health endpoint returned an unexpected response."
  } catch {
    $lastError = $_.Exception.Message
  }

  Start-Sleep -Milliseconds 250
}

$watch.Stop()

if (-not $ready) {
  Stop-ProcessSafely -ProcessId $process.Id -Reason "startup failure"
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
  Write-Host "`nORIGO failed to become ready within $StartupTimeoutSeconds seconds." -ForegroundColor Red
  if ($lastError) { Write-Host "Reason: $lastError" -ForegroundColor Red }
  Write-LogTail -Label "STDOUT" -Path $stdoutLog
  Write-LogTail -Label "STDERR" -Path $stderrLog
  exit 1
}

Write-Host "ORIGO is ready in $([math]::Round($watch.Elapsed.TotalSeconds, 2))s." -ForegroundColor Green
Write-Host "Open: http://localhost:$Port" -ForegroundColor Green
Write-Host "PID: $($process.Id)"
Write-Host "Logs: $stdoutLog | $stderrLog"

if ($ProbeOnly) {
  Stop-ProcessSafely -ProcessId $process.Id -Reason "ProbeOnly completed"
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
  Write-Host "Probe completed; no server was left running." -ForegroundColor Green
}
