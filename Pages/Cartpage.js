class CartPage {

    constructor(page) {

        this.page = page;

        this.phonesLink =
            page.locator('a[onclick="byCat(\'phone\')"]');

        this.monitorsLink =
            page.locator('a[onclick="byCat(\'monitor\')"]');

        this.laptopsLink =
            page.locator('a[onclick="byCat(\'notebook\')"]');

        this.productLinks =
            page.locator('.card-title a');

        this.addToCartBtn =
            page.locator('a[onclick^="addToCart"]');

        this.cartLink =
            page.locator('#cartur');

        this.placeOrderBtn =
            page.locator('button[data-target="#orderModal"]');

        this.orderModal =
            page.locator('#orderModal');

        this.orderName =
            page.locator('#name');

        this.orderCountry =
            page.locator('#country');

        this.orderCity =
            page.locator('#city');

        this.orderCard =
            page.locator('#card');

        this.orderMonth =
            page.locator('#month');

        this.orderYear =
            page.locator('#year');

        this.purchaseBtn =
            page.locator('button[onclick="purchaseOrder()"]');

        this.confirmModal =
            page.locator('.sweet-alert');

        this.confirmText =
    page.locator('.sweet-alert h2');

        this.confirmOkBtn =
            page.locator('.confirm');
    }

    async goToCategory(category) {

        const categories = {

            phones: this.phonesLink,

            monitors: this.monitorsLink,

            laptops: this.laptopsLink
        };

        await categories[
            category.toLowerCase()
        ].click();

        await this.page.waitForTimeout(2000);
    }

    async selectFirstProduct() {

        await this.productLinks.first()
            .waitFor({
                state: 'visible'
            });

        await this.productLinks.first().click();

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }

    async selectProductByName(productName) {

        const product =
            this.page.locator(
                '.card-title a',
                {
                    hasText: productName
                }
            );

        await product.waitFor({
            state: 'visible'
        });

        await product.click();

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }

    async addToCartAndAcceptAlert() {

    let alertMessage = '';

    this.page.once('dialog', async dialog => {

        alertMessage = dialog.message();

    });

    await this.addToCartBtn.click();

    await this.page.waitForTimeout(2000);

    return alertMessage;
}
    async goToCart() {

        await this.cartLink.click();

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }

    async clickPlaceOrder() {

        await this.placeOrderBtn.waitFor({
            state: 'visible'
        });

        await this.placeOrderBtn.click();

        await this.orderModal.waitFor({
            state: 'visible'
        });
    }

    async fillOrderForm(details) {

        await this.orderName.clear();

        await this.orderName.fill(
            details.name
        );

        await this.orderCountry.clear();

        await this.orderCountry.fill(
            details.country
        );

        await this.orderCity.clear();

        await this.orderCity.fill(
            details.city
        );

        await this.orderCard.clear();

        await this.orderCard.fill(
            details.creditcard
        );

        await this.orderMonth.clear();

        await this.orderMonth.fill(
            details.month
        );

        await this.orderYear.clear();

        await this.orderYear.fill(
            details.year
        );
    }

    async clickPurchase() {

        await this.purchaseBtn.click();

        await this.confirmModal.waitFor({
            state: 'visible',
            timeout: 10000
        });
    }

    async getConfirmationText() {

        return await this.confirmText
            .textContent();
    }

    async clickConfirmOk() {

        await this.confirmOkBtn.click();

        await this.page.waitForTimeout(1000);
    }
}

module.exports = { CartPage };