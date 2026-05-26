# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoprojectaddtocart.spec.js >> Add To Cart and Purchase Functionality >> TC09 - Add Monitor product and complete purchase
- Location: tests\demoprojectaddtocart.spec.js:95:5

# Error details

```
Error: dialog.accept: Cannot accept dialog which is already handled!
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: cart.html
        - listitem
        - listitem [ref=e17]:
          - link "Log out" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e19]:
          - link "Welcome anu555555" [ref=e20] [cursor=pointer]:
            - /url: "#"
        - listitem
  - generic [ref=e22]:
    - generic [ref=e25]:
      - list [ref=e26]:
        - listitem [ref=e27] [cursor=pointer]
        - listitem [ref=e28] [cursor=pointer]
        - listitem [ref=e29] [cursor=pointer]
      - link:
        - /url: "#myCarousel-2"
      - link:
        - /url: "#myCarousel-2"
    - generic [ref=e32]:
      - heading "Apple monitor 24" [level=2] [ref=e33]
      - separator [ref=e34]
      - heading "$400 *includes tax" [level=3] [ref=e35]
      - separator [ref=e36]
      - generic [ref=e37]:
        - list:
          - listitem
        - generic [ref=e39]:
          - strong [ref=e40]: Product description
          - paragraph [ref=e41]: LED Cinema Display features a 27-inch glossy LED-backlit TFT active-matrix LCD display with IPS technology and an optimum resolution of 2560x1440. It has a 178 degree horizontal and vertical viewing angle, a "typical" brightness of 375 cd/m2, contrast ratio of 1000:1, and a 12 ms response time.
      - separator [ref=e42]
      - link "Add to cart" [active] [ref=e45] [cursor=pointer]:
        - /url: "#"
  - generic [ref=e47]:
    - generic [ref=e50]:
      - heading "About Us" [level=4] [ref=e51]
      - paragraph [ref=e52]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e55]:
      - heading "Get in Touch" [level=4] [ref=e56]
      - paragraph [ref=e57]: "Address: 2390 El Camino Real"
      - paragraph [ref=e58]: "Phone: +440 123456"
      - paragraph [ref=e59]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e63]:
      - img [ref=e64]
      - text: PRODUCT STORE
  - contentinfo [ref=e65]:
    - paragraph [ref=e66]: Copyright © Product Store
```

# Test source

```ts
  49  |         this.orderCountry =
  50  |             page.locator('#country');
  51  | 
  52  |         this.orderCity =
  53  |             page.locator('#city');
  54  | 
  55  |         this.orderCard =
  56  |             page.locator('#card');
  57  | 
  58  |         this.orderMonth =
  59  |             page.locator('#month');
  60  | 
  61  |         this.orderYear =
  62  |             page.locator('#year');
  63  | 
  64  |         this.purchaseBtn =
  65  |             page.locator(
  66  |                 'button[onclick="purchaseOrder()"]'
  67  |             );
  68  | 
  69  |         // Confirmation Popup
  70  |         this.confirmModal =
  71  |             page.locator('.sweet-alert');
  72  | 
  73  |         this.confirmText =
  74  |             page.locator('.sweet-alert h2');
  75  | 
  76  |         this.confirmOkBtn =
  77  |             page.locator('.confirm');
  78  |     }
  79  | 
  80  |     async goToCategory(category) {
  81  | 
  82  |         const categories = {
  83  | 
  84  |             phones: this.phonesLink,
  85  | 
  86  |             monitors: this.monitorsLink,
  87  | 
  88  |             laptops: this.laptopsLink
  89  |         };
  90  | 
  91  |         await categories[
  92  |             category.toLowerCase()
  93  |         ].click();
  94  | 
  95  |         await this.page.waitForTimeout(2000);
  96  |     }
  97  | 
  98  |     async selectFirstProduct() {
  99  | 
  100 |         await this.productLinks.first()
  101 |             .waitFor({
  102 |                 state: 'visible'
  103 |             });
  104 | 
  105 |         await this.productLinks.first()
  106 |             .click();
  107 | 
  108 |         await this.addToCartBtn.waitFor({
  109 |             state: 'visible',
  110 |             timeout: 10000
  111 |         });
  112 |     }
  113 | 
  114 |     async selectProductByName(productName) {
  115 | 
  116 |         const product =
  117 |             this.page.locator(
  118 |                 '.card-title a',
  119 |                 {
  120 |                     hasText: productName
  121 |                 }
  122 |             );
  123 | 
  124 |         await product.waitFor({
  125 |             state: 'visible'
  126 |         });
  127 | 
  128 |         await product.click();
  129 | 
  130 |         await this.addToCartBtn.waitFor({
  131 |             state: 'visible',
  132 |             timeout: 10000
  133 |         });
  134 |     }
  135 | 
  136 |     async addToCartAndAcceptAlert() {
  137 | 
  138 |     const dialogPromise =
  139 |         this.page.waitForEvent('dialog');
  140 | 
  141 |     await this.addToCartBtn.click();
  142 | 
  143 |     const dialog =
  144 |         await dialogPromise;
  145 | 
  146 |     const alertMessage =
  147 |         dialog.message();
  148 | 
> 149 |     await dialog.accept();
      |                  ^ Error: dialog.accept: Cannot accept dialog which is already handled!
  150 | 
  151 |     return alertMessage;
  152 | }
  153 |     async goToCart() {
  154 | 
  155 |         await this.cartLink.click();
  156 | 
  157 |         await this.page.waitForLoadState(
  158 |             'domcontentloaded'
  159 |         );
  160 |     }
  161 | 
  162 |     async clickPlaceOrder() {
  163 | 
  164 |         await this.placeOrderBtn.waitFor({
  165 |             state: 'visible'
  166 |         });
  167 | 
  168 |         await this.placeOrderBtn.click();
  169 | 
  170 |         await this.orderModal.waitFor({
  171 |             state: 'visible'
  172 |         });
  173 |     }
  174 | 
  175 |     async fillOrderForm(details) {
  176 | 
  177 |         await this.orderName.clear();
  178 | 
  179 |         await this.orderName.fill(
  180 |             details.name
  181 |         );
  182 | 
  183 |         await this.orderCountry.clear();
  184 | 
  185 |         await this.orderCountry.fill(
  186 |             details.country
  187 |         );
  188 | 
  189 |         await this.orderCity.clear();
  190 | 
  191 |         await this.orderCity.fill(
  192 |             details.city
  193 |         );
  194 | 
  195 |         await this.orderCard.clear();
  196 | 
  197 |         await this.orderCard.fill(
  198 |             details.creditcard
  199 |         );
  200 | 
  201 |         await this.orderMonth.clear();
  202 | 
  203 |         await this.orderMonth.fill(
  204 |             details.month
  205 |         );
  206 | 
  207 |         await this.orderYear.clear();
  208 | 
  209 |         await this.orderYear.fill(
  210 |             details.year
  211 |         );
  212 |     }
  213 | 
  214 |     async clickPurchase() {
  215 | 
  216 |         await this.purchaseBtn.click();
  217 | 
  218 |         await this.confirmModal.waitFor({
  219 |             state: 'visible',
  220 |             timeout: 10000
  221 |         });
  222 |     }
  223 | 
  224 |     async getConfirmationText() {
  225 | 
  226 |         return await this.confirmText
  227 |             .textContent();
  228 |     }
  229 | 
  230 |     async clickConfirmOk() {
  231 | 
  232 |         await this.confirmOkBtn.click();
  233 | 
  234 |         await this.page.waitForTimeout(1000);
  235 |     }
  236 | }
  237 | 
  238 | module.exports = { CartPage };
```