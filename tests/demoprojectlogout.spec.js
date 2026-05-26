const { test, expect } =
require('@playwright/test');

const { LoginPage } =
require('../Pages/LoginPage');

const { LogoutPage } =
require('../Pages/LogoutPage');

const testData =
require('../TestData/testdata.json');

test.describe(
    'Logout Functionality',
    () => {

    test(
        'TC10 - Login with valid credentials and logout',
        async ({ page }) => {

        const loginPage =
            new LoginPage(page);

        const logoutPage =
            new LogoutPage(page);

        const creds =
            testData.validlogincredentials;

        await loginPage
            .navigateToApplication();

        const alertMessage =
            await loginPage.login(
                creds.username,
                creds.password
            );

        expect(alertMessage)
            .toBe('');

        expect(
            await loginPage.isLogoutVisible()
        ).toBeTruthy();

        await logoutPage.clickLogout();

        expect(
            await logoutPage.isLoggedOut()
        ).toBeTruthy();

    });

});