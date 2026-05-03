const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  // Wait for the app to be fully loaded
  await page.waitForSelector('h1', { state: 'visible' });

  // Focus the body first to reset tab state
  await page.evaluate(() => {
    document.body.focus();
  });

  // Press tab to focus the first interactive element (should be the skip link)
  await page.keyboard.press('Tab');

  // Take a screenshot of the focused skip link
  await page.screenshot({ path: '/home/jules/verification/screenshots/skip_link_focused.png' });
  console.log('Took screenshot of focused skip link.');

  // Click the skip link by simulating an Enter key press (since it has focus)
  await page.keyboard.press('Enter');

  // Verify that the focus moved to the main content
  const activeElementId = await page.evaluate(() => document.activeElement.id);
  const activeElementTagName = await page.evaluate(() => document.activeElement.tagName.toLowerCase());

  console.log(`Active element ID after skip: ${activeElementId}`);
  console.log(`Active element tag name after skip: ${activeElementTagName}`);

  if (activeElementId === 'main-content' && activeElementTagName === 'main') {
    console.log('✅ Focus successfully moved to the main content area.');
  } else {
    console.error('❌ Focus did not move to the main content area.');
  }

  // Also take a screenshot of the main content area being focused
  await page.screenshot({ path: '/home/jules/verification/screenshots/main_content_focused.png' });
  console.log('Took screenshot of main content focused state.');

  await browser.close();
})();
