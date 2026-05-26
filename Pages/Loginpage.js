class LoginPage {

    constructor(page) {

        this.page = page;

        this.loginLink = page.locator('#login2');

        this.loginModal = page.locator('#logInModal');

        this.username = page.locator('#loginusername');

        this.password = page.locator('#loginpassword');

        this.loginButton =
            page.locator('button[onclick="logIn()"]');

        this.welcomeText = page.locator('#nameofuser');

        this.logoutLink = page.locator('#logout2');
    }

    async navigateToApplication() {

        await this.page.goto(
            'https://www.demoblaze.com',
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async clickLoginLink() {

        await this.loginLink.click();

        await this.loginModal.waitFor({
            state: 'visible'
        });
    }

    async enterUsername(username) {

        await this.username.fill(username);
    }

    async enterPassword(password) {

        await this.password.fill(password);
    }

    async fillLoginDetails(username, password) {

        await this.enterUsername(username);

        await this.enterPassword(password);
    }

    async clickLoginButton() {

        await this.loginButton.click();
    }

    async login(username, password) {

        let alertMessage = '';

        const dialogPromise = new Promise(resolve => {

            this.page.once('dialog', async dialog => {

                alertMessage = dialog.message();

                await dialog.accept();

                resolve();
            });
        });

        await this.clickLoginLink();

        await this.fillLoginDetails(
            username,
            password
        );

        await this.clickLoginButton();

        try {

            await Promise.race([

                dialogPromise,

                this.welcomeText.waitFor({
                    state: 'visible',
                    timeout: 5000
                })

            ]);

        } catch (error) {

            console.log('No alert or welcome text appeared');
        }

        return alertMessage;
    }

    async getWelcomeText() {

        await this.welcomeText.waitFor({
            state: 'visible'
        });

        return await this.welcomeText.textContent();
    }

    async isLogoutVisible() {

        return await this.logoutLink.isVisible();
    }

    async clickLogout() {

        await this.logoutLink.click();
    }
}

module.exports = { LoginPage };