import { test as setup } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

setup("login", async ({ page }) => {
  const pm = new PageManager(page);
  await pm
    .loginTo()
    .useLogin(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  await page.waitForURL("/vendor");
  await page.context().storageState({ path: ".auth/login.json" });
});
