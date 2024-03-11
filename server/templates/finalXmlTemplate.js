function assembleFinalXml(xmlProducts) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<prestashop 
  xmlns:xlink="http://www.w3.org/1999/xlink">\n${xmlProducts}\n</prestashop>`;
}

module.exports = assembleFinalXml;
