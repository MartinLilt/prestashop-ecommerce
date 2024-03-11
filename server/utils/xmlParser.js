const xml2js = require("xml2js");

async function parseXml(xmlData) {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
  const { CATALOG: { PRODUCT } } = await parser.parseStringPromise(xmlData);
  return PRODUCT;
}

module.exports = parseXml;
