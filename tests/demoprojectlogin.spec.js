const { test, expect } =
require('@playwright/test');

const { LoginPage } =
require('../Pages/LoginPage');

const testData =
require('../utils/testdata.json');


// TC03 - Verify login with valid credentials

test(
    'TC03 - Verify login with valid credentials',
    async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    const data =
        testData.validlogincredentials;

    await loginPage
        .navigateToApplication();

    const alertMessage =
        await loginPage.login(
            data.username,
            data.password
        );

    // Verify no alert appears
    expect(alertMessage)
        .toBe('');

    // Capture welcome text
    const welcomeText =
        await loginPage.getWelcomeText();

    // Verify logged in username
    expect(welcomeText)
        .toContain(data.username);

    // Verify logout link visibility
    expect(
        await loginPage.isLogoutVisible()
    ).toBeTruthy();
});


// TC04 - Verify login with invalid username and valid password

test(
    'TC04 - Verify login with invalid username and valid password',
    async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    const data =
        testData.invalidlogincredentials[0];

    await loginPage
        .navigateToApplication();

    const alertMessage =
        await loginPage.login(
            data.username,
            data.password
        );

    // Verify user does not exist alert
    expect(
        alertMessage.toLowerCase()
    ).toContain(
        'user does not exist'
    );
});


// TC05 - Verify login with valid username and invalid password

test(
    'TC05 - Verify login with valid username and invalid password',
    async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    const data =
        testData.invalidlogincredentials[1];

    await loginPage
        .navigateToApplication();

    const alertMessage =
        await loginPage.login(
            data.username,
            data.password
        );

    // Verify wrong password alert
    expect(
        alertMessage.toLowerCase()
    ).toContain(
        'wrong password'
    );
});


// TC06 - Verify login with invalid username and invalid password

test(
    'TC06 - Verify login with invalid username and invalid password',
    async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    const data =
        testData.invalidlogincredentials[2];

    await loginPage
        .navigateToApplication();

    const alertMessage =
        await loginPage.login(
            data.username,
            data.password
        );

    // Verify user does not exist alert
    expect(
        alertMessage.toLowerCase()
    ).toContain(
        'user does not exist'
    );
});