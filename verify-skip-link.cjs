const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/home/jules/verification/videos/',
      size: { width: 1280, height: 720 }
    }
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:5173");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Initial focus
  await page.evaluate('document.body.focus()');

  // Press tab to focus the skip to content link
  await page.keyboard.press('Tab');

  // Check if skip link is focused
  const isSkipLinkFocused = await page.evaluate(() => {
    return document.activeElement && document.activeElement.getAttribute('href') === '#main-content';
  });
  console.log("Skip link focused:", isSkipLinkFocused);

  // Take screenshot of focused skip link
  await page.screenshot({ path: '/home/jules/verification/screenshots/skip-link-focused.png' });

  // Press enter to activate the link
  await page.keyboard.press('Enter');

  // Check if main content is focused
  const isMainContentFocused = await page.evaluate(() => {
    return document.activeElement && document.activeElement.id === 'main-content';
  });
  console.log("Main content focused after pressing enter:", isMainContentFocused);

  // Take screenshot of focused main content
  await page.screenshot({ path: '/home/jules/verification/screenshots/main-content-focused.png' });

  await context.close();
  await browser.close();
  console.log("Verification complete.");
})();
