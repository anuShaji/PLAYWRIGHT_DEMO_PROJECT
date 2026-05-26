const { test, expect } =
require('@playwright/test');

const { LoginPage } =
require('../Pages/LoginPage');

const { LogoutPage } =
require('../Pages/LogoutPage');

const testData =
require('../utils/testdata.json');


// TC10 - Verify logout functionality

test(
    'TC10 - Login with valid credentials and logout',
    async ({ page }) => {

    const loginPage =new LoginPage(page);

    const logoutPage =new LogoutPage(page);

    const credentials = testData.validlogincredentials;
    // Navigate to application
    await loginPage
        .navigateToApplication();

    // Perform login
    const alertMessage =
        await loginPage.login(
            credentials.username,
            credentials.password
        );

    // Verify login successful
    expect(alertMessage)
        .toBe('');

    // Verify logout link is visible
    expect(
        await loginPage
            .isLogoutVisible()
    ).toBeTruthy();

    // Perform logout
    await logoutPage
        .clickLogout();

    // Verify user logged out successfully
    expect(
        await logoutPage
            .isLoggedOut()
    ).toBeTruthy();

});