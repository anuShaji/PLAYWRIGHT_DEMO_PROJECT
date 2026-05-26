// Pages/LogoutPage.js
// POM - Logout  |  https://www.demoblaze.com

class LogoutPage {
  constructor(page) {
    this.page = page;

    this.logoutLink  = page.locator('#logout2');
    this.loginLink   = page.locator('#login2');
    this.welcomeText = page.locator('#nameofuser');
  }

  async clickLogout() {
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
    await this.page.waitForTimeout(1000);
  }

  async isLoggedOut() {
    const loginVisible   = await this.loginLink.isVisible();
    const welcomeHidden  = await this.welcomeText.isHidden();
    return loginVisible && welcomeHidden;
  }
}

module.exports = { LogoutPage };