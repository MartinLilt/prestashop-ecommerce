const dataExporter = require("../utils/dataExporter");

async function manufactureJob() {
  try {
    const result = await dataExporter();
    if(!result) {}
  } catch (e) {

  }
}

module.exports = manufactureJob;
