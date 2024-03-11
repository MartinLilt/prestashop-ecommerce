const xmlFetcher = require("../utils/xmlFetcher");
const xmlForPrestashop = require("../utils/xmlForPrestashop");
const backupReader = require("../utils/backupReader");
const logMaker = require("../utils/logMaker");
require("dotenv").config();

async function productJob() {
  try {
    const xmlData = await xmlFetcher(`${process.env.API_KEY_DB}`);
    if (!xmlData) throw new Error("Fetched XML data is undefined or empty.");

    await xmlForPrestashop(xmlData);
    await logMaker("Converted!", "success");
  } catch (e) {
    await logMaker(`Error: ${e}`, "error");
    await backupReader();
  }
}

module.exports = productJob;
