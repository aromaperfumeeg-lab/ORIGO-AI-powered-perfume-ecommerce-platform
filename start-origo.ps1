param(
  [int]$Port = 4173,
  [string]$Model = "gpt-5.4-mini"
)

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $HOME ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if ($nodeCommand) { $nodeCommand.Source } elseif (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { $null }

if (-not $node) {
  throw "Node.js is required. Install Node.js or run this project inside Codex Desktop."
}

$env:ORIGO_PORT = [string]$Port
$env:OPENAI_MODEL = $Model

if (-not $env:OPENAI_API_KEY) {
  Write-Warning "OPENAI_API_KEY is not set. The store will run, but OpenAI web research will remain disabled."
}

& $node (Join-Path $PSScriptRoot "server.mjs")
