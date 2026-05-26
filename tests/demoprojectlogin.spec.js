const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../Pages/LoginPage');

const testData = require('../utils/testdata.json');

test.describe('Login Functionality', () => {

    test('TC03 - Verify login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const data = testData.validlogincredentials;

    await loginPage.navigateToApplication();

    const alertMessage = await loginPage.login(
        data.username,
        data.password
    );

    expect(alertMessage).toBe('');

    const welcomeText = await loginPage.getWelcomeText();

    expect(welcomeText).toContain(data.username);

    expect(await loginPage.isLogoutVisible())
        .toBeTruthy();
});
    test('TC04 - Verify login with invalid username and valid password',
        async ({ page }) => {

        const loginPage = new LoginPage(page);

        const data = testData.invalidlogincredentials[0];

        await loginPage.navigateToApplication();

        const alertMessage = await loginPage.login(
            data.username,
            data.password
        );

        expect(alertMessage.toLowerCase())
            .toContain('user does not exist');
    });

    test('TC05 - Verify login with valid username and invalid password',
        async ({ page }) => {

        const loginPage = new LoginPage(page);

        const data = testData.invalidlogincredentials[1];

        await loginPage.navigateToApplication();

        const alertMessage = await loginPage.login(
            data.username,
            data.password
        );

        expect(alertMessage.toLowerCase())
            .toContain('wrong password');
    });

    test('TC06 - Verify login with invalid username and invalid password',
        async ({ page }) => {

        const loginPage = new LoginPage(page);

        const data = testData.invalidlogincredentials[2];

        await loginPage.navigateToApplication();

        const alertMessage = await loginPage.login(
            data.username,
            data.password
        );

        expect(alertMessage.toLowerCase())
            .toContain('user does not exist');
    });

});