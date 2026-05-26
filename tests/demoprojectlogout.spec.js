// tests/demoprojectlogout.spec.js
// TC10 - Logout
// Data source: TestData/testdata.xlsx  →  Sheet: Login  row 0 (valid credentials)

const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../Pages/LoginPage');
const { LogoutPage }   = require('../Pages/LogoutPage');
const excel            = require('../utils/excelReader');

test.describe('Logout Tests | demoblaze.com', () => {

  /**
   * TC10: Login with valid credentials → Logout
   */
  test('TC10 - Login with valid credentials and logout', async ({ page }) => {
    const creds     = excel.getLoginRow(0);      // valid login row from Excel
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login(creds.Username, creds.Password);
    await loginPage.waitForWelcome();

    // Confirm we are logged in
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    // Perform logout
    const logoutPage = new LogoutPage(page);
    await logoutPage.clickLogout();

    // Verify logged out
    expect(await logoutPage.isLoggedOut()).toBeTruthy();
  });

});