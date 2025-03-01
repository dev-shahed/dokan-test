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
    await this.productSortBy("Newest First");
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
    await this.page.fill("#shipping-first-name", "John");
    await this.page.fill("#shipping-last-name", "Doe");
    // Shipping address filling
    await this.selectCountryAndAddress(
      "United States",
      "New York",
      "New York",
      "10001"
    );
    // Order section selection..
    // const shippingOption = this.page.getByRole("radio", { name: "Free" });
    // await shippingOption.click();
    await this.page
      .getByRole("button", { name: "Continue to Payment" })
      .click();

    // Payment section filling
    await this.page.locator("span", { hasText: "Cash On Delivery" }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Place order" }).click();
  }

  // helper function to sort the product
  sortType = {
    "Newest First": "createdAt=desc",
    "Lowest Price": "price=asc",
    "Highest Price": "price=desc",
  };

  // helper function to sort the product
  async productSortBy(sortBy: string) {
    const dropdown = this.page.locator("select");
    await dropdown.click();
    await dropdown.selectOption(this.sortType[sortBy]);
    const selectedOption = await dropdown.inputValue();
    expect(selectedOption).toBe(this.sortType[sortBy]);
    // Ensure dropdown has the expected option
    const optionList = this.page.locator("select option");
    await expect(optionList).toContainText(Object.keys(this.sortType));
  }

  async selectCountryAndAddress(
    country: string,
    state: string,
    city: string,
    postalCode: string
  ) {
    // Select country
    const countryDropdown = this.page.getByRole("combobox");
    await countryDropdown.click();
    await countryDropdown.fill(country);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("option", { name: country }).click();

    // Fill in address details
    await this.page.fill("#shipping-address1", state, { timeout: 1000 });
    await this.page.locator("#shipping-address1").click();
    await this.page.waitForTimeout(500); // Small delay for UI update
    await this.page.locator("#shipping-address1").fill(state);
    await this.page.waitForTimeout(1000);

    // Press "ArrowDown" to highlight the first result and select it
    await this.page.keyboard.press("ArrowDown");
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);

    // Fill in city and postal code
    await this.page.fill("#shipping-city", city);
    await this.page.fill("#shipping-postal-code", postalCode);
    await this.page.getByRole("button", { name: "Continue to Orders" }).click();
  }
}
