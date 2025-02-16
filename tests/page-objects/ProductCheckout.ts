import { expect, Page } from "@playwright/test";

export class ProductCheckout {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addToCartAndCheckout(storeName: string) {
    const getStore = await this.page.locator("h3.store-name").textContent();
    expect(getStore).toBe(storeName);

    // select the newest product
    const dropdownMenus = this.page.locator("select");
    await dropdownMenus.click();
    await dropdownMenus.selectOption("createdAt=desc");
    const optionList = this.page.getByRole("option");
    await expect(optionList).toContainText(["Newest First"]);
    const product = this.page.locator(".group\\/product").first();
    await product.hover();
    await product.locator(".add-to-cart-btn").click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Go to Cart" }).click();
    await this.page.waitForTimeout(1000);
    await this.page
      .getByRole("button", { name: "Proceed to Checkout" })
      .click();
    await this.page.waitForTimeout(1000);

    // Checkout page form filling
    // Shipping address filling
    await this.page.fill("#shipping-first-name", "John");
    await this.page.fill("#shipping-last-name", "Doe");
    await this.page.getByRole("combobox").click();
    await this.page.getByRole("combobox").fill("United States");
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("option", { name: "United States" }).click();
    await this.page.fill("#shipping-address1", "New York", { timeout: 1000 });
    await this.page.locator("#shipping-address1").click();
    await this.page.waitForTimeout(500); // Small delay for UI update
    await this.page.locator("#shipping-address1").fill("New York");
    await this.page.waitForTimeout(1000);
    //Press "ArrowDown" once to highlight the first result
    await this.page.keyboard.press("ArrowDown");
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);
    await this.page.fill("#shipping-city", "New York");
    await this.page.fill("#shipping-postal-code", "10001");
    await this.page.getByRole("button", { name: "Continue to Orders" }).click();
    // Order section selection..
    const shippingOption = this.page.getByRole("radio", { name: "Free" });
    await shippingOption.click();

    await this.page
      .getByRole("button", { name: "Continue to Payment" })
      .click();

    // Payment section filling
    await this.page.locator("span", { hasText: "Cash On Delivery" }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Place order" }).click();
  }
}
