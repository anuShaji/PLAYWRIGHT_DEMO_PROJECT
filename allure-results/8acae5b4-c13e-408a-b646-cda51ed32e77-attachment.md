# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoprojectaddtocart.spec.js >> Add To Cart and Purchase Functionality >> TC08 - Add Phone product and complete purchase
- Location: tests\demoprojectaddtocart.spec.js:55:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#nameofuser')
Expected: visible
Received: undefined
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#nameofuser')
    - waiting for" https://www.demoblaze.com/" navigation to finish...

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - img [ref=e4]
      - text: PRODUCT STORE
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]:
        - generic [ref=e31]: Previous
      - button "Next" [ref=e32] [cursor=pointer]:
        - generic [ref=e34]: Next
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
  - generic [ref=e51]:
    - generic [ref=e54]:
      - heading "About Us" [level=4] [ref=e55]
      - paragraph [ref=e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e59]:
      - heading "Get in Touch" [level=4] [ref=e60]
      - paragraph [ref=e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=e62]: "Phone: +440 123456"
      - paragraph [ref=e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e67]:
      - img [ref=e68]
      - text: PRODUCT STORE
  - contentinfo [ref=e69]:
    - paragraph [ref=e70]: Copyright © Product Store
```

# Test source

```ts
  1   | // tests/demoprojectaddtocart.spec.js
  2   | // TC07 – TC09 - Add to Cart and Purchase
  3   | // Data source: TestData/testdata.xlsx
  4   | //   Sheet "Products"        → Category, ProductName, TCReference
  5   | //   Sheet "PurchaseDetails" → Name, Country, City, CreditCard, Month, Year
  6   | //   Sheet "Login"  row 0    → valid credentials for beforeEach login
  7   | 
  8   | const { test, expect } = require('@playwright/test');
  9   | 
  10  | const { LoginPage } = require('../Pages/LoginPage');
  11  | 
  12  | const { CartPage } = require('../Pages/CartPage');
  13  | 
  14  | const testData = require('../utils/testdata.json');
  15  | 
  16  | async function loginUser(page) {
  17  | 
  18  |     const loginPage = new LoginPage(page);
  19  | 
  20  |     const creds = testData.validlogincredentials;
  21  | 
  22  |     await loginPage.navigateToApplication();
  23  | 
  24  |     await loginPage.login(
  25  |         creds.username,
  26  |         creds.password
  27  |     );
  28  | 
  29  |     await expect(
  30  |         loginPage.welcomeText
> 31  |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  32  | }
  33  | 
  34  | test.describe(
  35  |     'Add To Cart and Purchase Functionality',
  36  |     () => {
  37  | 
  38  |     test(
  39  |         'TC07 - Select product and add to cart',
  40  |         async ({ page }) => {
  41  | 
  42  |         await loginUser(page);
  43  | 
  44  |         const cartPage = new CartPage(page);
  45  | 
  46  |         await cartPage.selectFirstProduct();
  47  | 
  48  |         const alertMessage =
  49  |             await cartPage.addToCartAndAcceptAlert();
  50  | 
  51  |         expect(alertMessage)
  52  |             .toContain('Product added');
  53  |     });
  54  | 
  55  |     test(
  56  |         'TC08 - Add Phone product and complete purchase',
  57  |         async ({ page }) => {
  58  | 
  59  |         await loginUser(page);
  60  | 
  61  |         const cartPage = new CartPage(page);
  62  | 
  63  |         await cartPage.goToCategory('phones');
  64  | 
  65  |         await cartPage.selectProductByName(
  66  |             'Samsung galaxy s6'
  67  |         );
  68  | 
  69  |         const alertMessage =
  70  |             await cartPage.addToCartAndAcceptAlert();
  71  | 
  72  |         expect(alertMessage)
  73  |             .toContain('Product added');
  74  | 
  75  |         await cartPage.goToCart();
  76  | 
  77  |         await cartPage.clickPlaceOrder();
  78  | 
  79  |         await cartPage.fillOrderForm(
  80  |             testData.placeorderDetails
  81  |         );
  82  | 
  83  |         await cartPage.clickPurchase();
  84  | 
  85  |         const confirmationText =
  86  |             await cartPage.getConfirmationText();
  87  | expect(confirmationText)
  88  |     .toContain(
  89  |         testData.purchaseSuccessMessage
  90  |     )
  91  | console.log(confirmationText);
  92  |         await cartPage.clickConfirmOk();
  93  |     });
  94  | 
  95  |     test(
  96  |         'TC09 - Add Monitor product and complete purchase',
  97  |         async ({ page }) => {
  98  | 
  99  |         await loginUser(page);
  100 | 
  101 |         const cartPage = new CartPage(page);
  102 | 
  103 |         await cartPage.goToCategory('monitors');
  104 | 
  105 |         await cartPage.selectProductByName(
  106 |             'Apple monitor 24'
  107 |         );
  108 | 
  109 |         const alertMessage =
  110 |             await cartPage.addToCartAndAcceptAlert();
  111 | 
  112 |         expect(alertMessage)
  113 |             .toContain('Product added');
  114 | 
  115 |         await cartPage.goToCart();
  116 | 
  117 |         await cartPage.clickPlaceOrder();
  118 | 
  119 |         await cartPage.fillOrderForm(
  120 |             testData.placeorderDetails
  121 |         );
  122 | 
  123 |         await cartPage.clickPurchase();
  124 | 
  125 |         const confirmationText =
  126 |             await cartPage.getConfirmationText();
  127 | expect(confirmationText)
  128 |     .toContain(
  129 |         testData.purchaseSuccessMessage.message
  130 |     )
  131 | 
```