const loginUser = async (page, email, password) => {
  await page.goto("https://e-ticket.staging.dokandev.com/vendor/login");
  // Fill in email and password and login
  await page.fill("#login-email", email);
  await page.fill("#login-password", password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
};

module.exports = {
  loginUser,
};
