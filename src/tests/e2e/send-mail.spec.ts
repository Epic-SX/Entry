import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'

test.describe.configure({ mode: 'parallel' });
dotenv.config();

test.describe('test send mail page', () => {
  const btn: object = {
    sendMail: 'Send Mail',
  };

  /**
   * Test button send mail
   * @return void
   */
  test(`test click send mail button`, async ({ page }): Promise<void> => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/jp/e2e/send-mail');
    // Wait visible input and button send mail
    const inputLocator = page.locator('input[name="email"]');
    await inputLocator.waitFor( { state: 'visible', timeout: 5000 });
    // Fill email send to test
    await inputLocator.fill(process.env.NEXT_PUBLIC_MAIL_TEST);
    // Find an element with the text sendmail and click on it
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await page.getByRole('button', { name: btn.sendMail }).click();
    // wait send mail
    const statusLocator = page.locator('div#send-status');
    await statusLocator.waitFor({ state: 'visible', timeout: 10000 });
    await expect(statusLocator).toContainText('success', { timeout: 7000 });
  });
});
