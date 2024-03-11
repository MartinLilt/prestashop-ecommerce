const fs = require("fs").promises;
const path = require("path");
const {
  vars: { backupFile },
} = require("../vars");
const productToXml = require("../templates/productTemplate");
const assembleFinalXml = require("../templates/finalXmlTemplate");
const manufacturerFilter = require("./manufactureFilter");
const conditionFilter = require("./conditionFilter");
const xmlParser = require("../utils/xmlParser");

async function xmlForPrestashop(inputXml) {
  const parsedXml = await xmlParser(inputXml);
  const conditions = await conditionFilter(parsedXml);
  const manufacturers = await manufacturerFilter(parsedXml);
  const description = await descriptionFilter(parsedXml);

  const xmlProducts = productsXml
    .map((product) =>
      productToXml(product, conditions, manufacturers, description)
    )
    .join("\n");

  const backupDir = path.join(__dirname, "..", "data");
  await fs.mkdir(backupDir, { recursive: true }).catch((error) => {
    if (error.code !== "EEXIST") throw error;
  });
  const backupFilePath = path.join(backupDir, backupFile);
  const finalXml = assembleFinalXml(xmlProducts);
  await fs.writeFile(backupFilePath, finalXml, "utf8");

  console.table(
    `Backup: ${xmlProducts.split("<product>").length - 1} products is saved.`
  );
}

module.exports = xmlForPrestashop;
