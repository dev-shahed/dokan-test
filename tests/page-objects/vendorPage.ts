import { Page } from "@playwright/test";

export class VendorPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async confirmOrderStatus() {
    await this.page.getByText('shahedthedev@gmail.com').first().click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Charge Order" }).click();
    await this.page.locator("button", { hasText: /^Charge \$/ }).click();
  }
}
