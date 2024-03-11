const zlib = require("zlib");

function prestaCacheBuilder(array, options, isJson = true) {
  const items = array.map((product) => {
    const item = {};
    Object.entries(options).forEach(([jsonKey, productKey]) => {
      item[jsonKey] = product.hasOwnProperty(productKey)
        ? product[productKey]
        : productKey;
    });
    return item;
  });

  const result = isJson ? JSON.stringify(items, null, 2) : items;
  // const compressed = zlib.gzipSync(jsonString); // Optional compression
  return result;
}

module.exports = prestaCacheBuilder;
