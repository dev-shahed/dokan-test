import { expect, Page } from "@playwright/test";

export class NavigatePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async productsRoute() {
    await this.selectGroupMenuItem("Products");
    await this.page.getByText("All Products").click();
  }

  //select group item or parent menu item
  async selectGroupMenuItem(menuTitle: string) {
    await this.page.waitForSelector(".sidebar");
    const groupMenuItem = this.page.locator(".sidebar-link", {
      hasText: menuTitle,
    });
    await groupMenuItem.waitFor({ state: "visible" });
    const hasOpenClass = await groupMenuItem.getAttribute("class");
    if (!hasOpenClass?.includes("open")) {
      await groupMenuItem.click();
      await this.page.waitForTimeout(500);
      
    }
  }
}
