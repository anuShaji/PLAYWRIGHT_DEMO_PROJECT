const { test, expect } =
require('@playwright/test');

const { SignupPage } =
require('../Pages/SignupPage');

const testData =
require('../utils/testdata.json');


// TC01 - Verify successful signup functionality

test(
    'TC01 - Sign Up -> Enter Data -> Click Sign Up',
    async ({ page }) => {

    const signupPage =
        new SignupPage(page);

    const uniqueUsername =
        testData.signup.username;

    // Navigate to application
    await signupPage
        .navigateToApplication();

    // Open signup modal
    await signupPage
        .clickSignupLink();

    // Enter username
    await signupPage
        .enterUsername(uniqueUsername);

    // Enter password
    await signupPage
        .enterPassword(
            testData.signup.password
        );

    // Handle signup success alert
    page.once(
        'dialog',
        async dialog => {

        console.log(
            dialog.message()
        );

        await dialog.accept();
    });

    // Click signup button
    await signupPage
        .clickSignupButton();

    await page.waitForTimeout(2000);
});


// TC02 - Verify signup modal close functionality

test(
    'TC02 - Sign Up -> Enter Data -> Click Close',
    async ({ page }) => {

    const signupPage =
        new SignupPage(page);

    // Navigate to application
    await signupPage
        .navigateToApplication();

    // Open signup modal
    await signupPage
        .clickSignupLink();

    // Enter username
    await signupPage
        .enterUsername(
            testData.signup.username
        );

    // Enter password
    await signupPage
        .enterPassword(
            testData.signup.password
        );

    // Close signup popup
    await signupPage
        .clickCloseButton();

    // Verify popup closed successfully
    expect(
        await signupPage
            .isSignupModalClosed()
    ).toBeTruthy();
});