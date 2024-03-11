const axios = require("axios");

async function dataExporter(csvData, url, apiKey) {
  try {
    const config = {
      headers: {
        "Content-Type": "text/csv",
        Authorization: `Basic ${apiKey}`,
      },
    };

    const response = await axios.post(url, csvData, config);

    console.log("Data exported successfully:", response.data);
  } catch (e) {
    console.error("Error exporting data:", e.message);
  }
}

module.exports = dataExporter;
