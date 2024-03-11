const xml2js = require("xml2js");
const fs = require("fs").promises;
const path = require("path");
const {
  vars: { cacheFile },
} = require("../vars");

async function manufactureFilter(xmlData) {
  try {
    const products = await parseXml(xmlData);
    if (!products.length) {
      console.log("No products found in the provided XML data.");
      return;
    }
    const uniqueManufacturers = extractUniqueManufacturers(products);
    const manufacturersArray = convertToManufacturersArray(uniqueManufacturers);
    const xml = buildPrestaShopXml(manufacturersArray);
    await writeXmlToFile(xml);
    return xml;
  } catch (error) {
    console.error("Error in manufactureFilter:", error.message);
  }
}

async function parseXml(xmlData) {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
  try {
    const result = await parser.parseStringPromise(xmlData);
    return result.CATALOG && result.CATALOG.PRODUCT
      ? Array.isArray(result.CATALOG.PRODUCT)
        ? result.CATALOG.PRODUCT
        : [result.CATALOG.PRODUCT]
      : [];
  } catch (error) {
    throw new Error(`Failed to parse XML data: ${error.message}`);
  }
}

function extractUniqueManufacturers(products) {
  const uniqueManufacturers = {};
  products.forEach((product) => {
    const manufacturer = product.MANUFACTURER;
    if (manufacturer && !(manufacturer in uniqueManufacturers)) {
      uniqueManufacturers[manufacturer] =
        Object.keys(uniqueManufacturers).length + 1;
    }
  });
  return uniqueManufacturers;
}

function convertToManufacturersArray(uniqueManufacturers) {
  return Object.entries(uniqueManufacturers).map(([brand, id]) => ({
    brand,
    id,
  }));
}

function buildPrestaShopXml(manufacturersArray) {
  const builder = new xml2js.Builder({
    rootName: "prestashop",
    xmldec: { version: "1.0", encoding: "UTF-8" },
  });

  const prestashopManufacturers = manufacturersArray.map(({ id, brand }) => ({
    manufacturer: {
      id: `<![CDATA[${id}]]>`,
      name: `<![CDATA[${brand}]]>`,
    },
  }));

  return builder.buildObject({ manufacturers: prestashopManufacturers });
}

async function writeXmlToFile(xml) {
  const outputPath = path.resolve(__dirname, "..", "cache", cacheFile);
  try {
    await fs.writeFile(outputPath, xml, "utf8");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "- Manufacturer: File written successfully."
    );
  } catch (error) {
    throw new Error(`Failed to write XML to file: ${error.message}`);
  }
}

module.exports = manufactureFilter;
