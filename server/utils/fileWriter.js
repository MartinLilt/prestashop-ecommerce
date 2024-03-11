const path = require("path");
const fs = require('fs').promises;

async function fileWriter(cacheData, fileName) {
  const outputPath = path.resolve(__dirname, "..", "cache", fileName);
  try {
    await fs.writeFile(outputPath, cacheData, "utf8");
  } catch (err) {
    throw new Error(`Failed to write XML to file: ${err.message}`);
  }
}

module.exports = fileWriter;