import { test, expect } from '@playwright/test';

test('home page renders primary heading', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h1').innerText()).toContain('반려자');
});
