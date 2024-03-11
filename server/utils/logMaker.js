const path = require("path");
const fs = require("fs").promises;
const {
  vars: { logFile },
} = require("../vars");

async function logMaker(message, status) {
  const logsDirectoryPath = path.join(__dirname, "..", "logs");
  const logFilePath = path.join(logsDirectoryPath, logFile);

  try {
    await fs.mkdir(logsDirectoryPath, { recursive: true }).catch((e) => {
      if (e.code !== "EEXIST") throw e;
    });

    // Get current date/time in Lithuania
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const lithuaniaTime = new Date(date.getTime() + offset + 3600000 * 2); // EET is UTC+2, adjust this if DST applies
    const formattedDate = lithuaniaTime
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")
      .replace(/-/g, "/")
      .substring(0, 16);

    const logMessage = `${formattedDate} [${status.toUpperCase()}] - ${message}\n`;
    await fs.appendFile(logFilePath, logMessage);
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}

module.exports = logMaker;
