const fs = require("fs").promises;
const path = require("path");

async function fileReader(fileName) {
  const filePath = path.resolve(__dirname, "..", "cache", fileName);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (e) {
    throw new Error(`Failed to read XML file: ${e.message}`);
  }
}

module.exports = fileReader;

