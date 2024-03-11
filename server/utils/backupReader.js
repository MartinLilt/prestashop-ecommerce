const path = require("path");
const fs = require("fs").promises;
const logMaker = require("../utils/logMaker");
const {
  vars: { backupFile },
} = require("../vars");

async function backupReader() {
  const filePath = path.resolve(__dirname, "..", "data", backupFile);

  try {
    await fs.access(filePath, fs.constants.F_OK).catch(async () => {
      await fs.writeFile(filePath, "", "utf8");
    });

    const data = await fs.readFile(filePath, "utf8");
    const logger = `Backup: ${
      (data.match(/<product>/g) || []).length
    } products successfully read.`;
    await logMaker(logger, "success");
    console.log(`- ${logger}`);
  } catch (e) {
    await logMaker(`Backup: ${e.message}`, "error");
  }
}

module.exports = backupReader;
