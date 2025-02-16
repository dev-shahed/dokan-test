import { expect, Page } from "@playwright/test";
import { generateProduct } from "../util/faker";

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addProduct() {
    const fakerProduct = generateProduct();
    const {
      title,
      description,
      image,
      regular_price,
      sale_price,
      sku,
      barcode,
      weight,
      dimensions,
    } = fakerProduct;

    let type = "Standard";

    await this.page.getByRole("link", { name: "Add Product" }).click();
    await this.page.fill("#product-name", title);
    const productType = this.page.getByRole("radio", { name: type });
    await productType.click();
    await this.page.fill(".ql-editor", description);
    await this.page.locator(".ql-blank").waitFor({ state: "detached" });
    await this.selectCategory("Uncategorized");
    await this.page.fill("#regular-price", regular_price.toString());
    await this.page.fill("#sale-price", sale_price.toString());
    await this.page.fill("#sku", sku);
    await this.page.fill("#low-stock-threshold", barcode);
    await this.selectShipping("Standard Free");
    //status
    const statusArea = this.page.getByText("Draft");
    await statusArea.click();
    await this.page.getByText("Published").click();
    await this.page.fill("#shipping-height", dimensions.height.toString());
    await this.page.fill("#shipping-width", dimensions.width.toString());
    await this.page.fill("#shipping-length", dimensions.length.toString());
    await this.page.locator("button", { hasText: "Create" }).first().click();
    await this.page.waitForURL("**/products");
    await this.page.waitForSelector("table tbody tr", { timeout: 5000 });
    await expect(this.page.getByText(title)).toBeVisible();
  }

  //helper for select categories..

  async selectCategory(categoryName: string) {
    const categoryInput = this.page.locator('input[placeholder="Search"]');
    await categoryInput.click();
    await this.page.waitForSelector("ul li", {
      state: "visible",
    });
    // Click the desired category option
    const categoryOption = this.page.locator("ul li", {
      hasText: categoryName,
    });
    await categoryOption.click();
  }
  async selectShipping(name: string) {
    const label = this.page.locator('label:text("Shipping Profile")');
    await this.page.pause();
    // Click on the dropdown (better than clicking the icon)
    await label.locator("xpath=following-sibling::div").click();
    await this.page.getByRole("option", { name: name }).click();
  }
}
