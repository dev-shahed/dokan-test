import { expect, Page } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async useLogin(email: string, password: string) {
    await this.page.goto("/vendor/login");
    await this.page.fill("#login-email", email);
    await this.page.fill("#login-password", password);
    await this.page.click('button[type="submit"]');
    await expect(this.page).toHaveURL("/vendor", { timeout: 3000 });
  }
}
