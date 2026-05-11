const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/home/jules/verification/videos/',
      size: { width: 1280, height: 720 }
    }
  });
  const page = await context.newPage();

  console.log('Navigating to local server...');
  await page.goto('http://localhost:5173');

  console.log('Waiting for initial load...');
  // Wait for the app to render
  await page.waitForSelector('#root');

  console.log('Taking baseline screenshot...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/baseline.png' });

  console.log('Simulating keyboard navigation to test Skip to Main Content...');
  // Ensure the body has focus first
  await page.evaluate('document.body.focus()');

  // Press Tab. The first focusable element should be the visually hidden skip link
  await page.keyboard.press('Tab');
  await page.waitForTimeout(500); // Give it time to become visible

  console.log('Taking screenshot of skip link focused...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/skip-link-focused.png' });

  // Press Enter to activate the skip link
  console.log('Activating skip link...');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  // Check focus is on main content
  console.log('Checking focus...');
  const isMainFocused = await page.evaluate(() => {
    return document.activeElement && document.activeElement.id === 'main-content';
  });

  console.log(`Focus correctly moved to #main-content: ${isMainFocused}`);

  console.log('Taking screenshot after skip link activation...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/after-skip.png' });

  // Press tab again to see where focus goes next
  await page.keyboard.press('Tab');
  await page.waitForTimeout(500);

  console.log('Taking screenshot of focus after main content...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/focus-after-main.png' });

  await context.close();
  await browser.close();

  console.log('Verification script completed.');
})();