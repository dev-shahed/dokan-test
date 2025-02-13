import { Page } from "@playwright/test";

export class VendorPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
