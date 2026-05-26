// utils/excelReader.js
// Reads test data from TestData/testdata.xlsx using the 'xlsx' (SheetJS) library
// Each sheet maps to a specific test area

const XLSX = require('xlsx');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../TestData/ApplicationData.xlsx');
//C:\Users\ANUPAMA VISHNU\OneDrive\Desktop\PLAYWRIGHTDEMO\TestData\ApplicationData.xlsx

/**
 * Read all rows from a given sheet as an array of objects
 * (first row is treated as column headers)
 * @param {string} sheetName
 * @returns {object[]}
 */
function readSheet(sheetName) {
  const workbook = XLSX.readFile(FILE_PATH);
  const sheet    = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${FILE_PATH}`);
  }
  return XLSX.utils.sheet_to_json(sheet);
}

/**
 * Get signup credentials  →  { Username, Password }
 * @returns {{ Username: string, Password: string }}
 */
function getSignupData() {
  return readSheet('Signup')[0];
}

/**
 * Get all login test rows  →  [{ Username, Password, ExpectedResult }, …]
 * @returns {object[]}
 */
function getLoginData() {
  return readSheet('Login');
}

/**
 * Get a single login row by 0-based index
 * @param {number} index
 * @returns {object}
 */
function getLoginRow(index) {
  return getLoginData()[index];
}

/**
 * Get product row by TC reference (e.g. 'TC07', 'TC08', 'TC09')
 * @param {string} tcRef
 * @returns {{ Category: string, ProductName: string, TCReference: string }}
 */
function getProductByTC(tcRef) {
  const rows = readSheet('Products');
  const row  = rows.find(r => r.TCReference === tcRef);
  if (!row) throw new Error(`No product found for TC reference "${tcRef}"`);
  return row;
}

/**
 * Get purchase form details  →  { Name, Country, City, CreditCard, Month, Year }
 * @returns {object}
 */
function getPurchaseDetails() {
  return readSheet('PurchaseDetails')[0];
}

module.exports = {
  readSheet,
  getSignupData,
  getLoginData,
  getLoginRow,
  getProductByTC,
  getPurchaseDetails,
};