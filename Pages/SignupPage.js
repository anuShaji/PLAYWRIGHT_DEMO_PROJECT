class SignupPage {

    constructor(page) {

        this.page = page;

        this.signupLink = page.locator('#signin2');

        this.username = page.locator('#sign-username');

        this.password = page.locator('#sign-password');

        this.signupButton = page.locator('button[onclick="register()"]');

        this.closeButton = page.locator('#signInModal .btn-secondary');

        this.signupModal = page.locator('#signInModal');
    }

    async navigateToApplication() {

        await this.page.goto('https://www.demoblaze.com', {
            waitUntil: 'domcontentloaded'
        });
    }

    async clickSignupLink() {

        await this.signupLink.click();

        await this.signupModal.waitFor({
            state: 'visible'
        });
    }

    async enterUsername(username) {

        await this.username.fill(username);
    }

    async enterPassword(password) {

        await this.password.fill(password);
    }

    async fillSignupDetails(username, password) {

        await this.enterUsername(username);

        await this.enterPassword(password);
    }

    async clickSignupButton() {

        await this.signupButton.click();
    }

    async clickCloseButton() {

        await this.closeButton.click();

        await this.signupModal.waitFor({
            state: 'hidden'
        });
    }

    async isSignupModalClosed() {

        return await this.signupModal.isHidden();
    }
}

module.exports = { SignupPage };