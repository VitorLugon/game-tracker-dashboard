import { test } from '@playwright/test';

test('inspect runtime', async ({ page }) => {
  page.on('console', (msg) => console.log('[console]', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));

  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  const rootHtml = await page.locator('#root').innerHTML();
  const bodyText = await page.locator('body').innerText();
  console.log('[root-length]', rootHtml.length);
  console.log('[body-text]', bodyText.slice(0, 300));
});