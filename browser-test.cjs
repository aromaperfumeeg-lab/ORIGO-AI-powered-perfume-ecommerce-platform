const { chromium } = require('playwright');
const path = require('node:path');
const { spawn } = require('node:child_process');
let localServer;

(async () => {
  localServer = spawn(process.execPath, ['server.mjs'], {
    cwd: __dirname,
    env: { ...process.env, PORT: '4174' },
    stdio: 'ignore',
    windowsHide: true
  });
  await new Promise(resolve => setTimeout(resolve, 700));
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(7000);
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  console.log('STEP desktop-load');
  await page.goto('http://127.0.0.1:4174/', { waitUntil: 'domcontentloaded', timeout: 12000 });
  await page.waitForTimeout(800);
  const desktop = {
    title: await page.title(),
    direction: await page.locator('html').getAttribute('dir'),
    products: await page.locator('.product-card').count(),
    horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  };
  await page.screenshot({ path: path.resolve('origo-desktop.png'), fullPage: true });
  console.log('STEP interactions');
  await page.locator('[data-add="khamrah"]').click();
  await page.locator('[data-open-cart]').first().click();
  const cart = {
    open: await page.locator('.cart-drawer').evaluate(el => el.classList.contains('open')),
    summary: await page.locator('#cart-summary').textContent()
  };
  await page.locator('[data-close-cart]').click();
  await page.locator('[data-open-quiz]').first().click();
  for (let i = 0; i < 3; i++) await page.locator('[data-answer]').first().click();
  const quizResult = await page.locator('.quiz-result').count();
  const mobileErrors = [];
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobilePage.setDefaultTimeout(7000);
  mobilePage.on('console', m => { if (m.type() === 'error') mobileErrors.push(m.text()); });
  mobilePage.on('pageerror', e => mobileErrors.push(e.message));
  console.log('STEP mobile-load');
  await mobilePage.goto('http://127.0.0.1:4174/', { waitUntil: 'domcontentloaded', timeout: 12000 });
  await mobilePage.waitForTimeout(600);
  const mobile = {
    bottomNav: await mobilePage.locator('.mobile-nav').evaluate(el => getComputedStyle(el).display),
    products: await mobilePage.locator('.product-card').count(),
    horizontalOverflow: await mobilePage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  };
  await mobilePage.screenshot({ path: path.resolve('origo-mobile.png'), fullPage: true });
  await browser.close();
  localServer.kill();
  console.log(JSON.stringify({ desktop, cart, quizResult, mobile, errors, mobileErrors }, null, 2));
  if (errors.length || mobileErrors.length || desktop.horizontalOverflow > 1 || mobile.horizontalOverflow > 1 || !cart.open || quizResult !== 1) process.exitCode = 1;
})().catch(error => { if (localServer) localServer.kill(); console.error(error); process.exitCode = 1; });
