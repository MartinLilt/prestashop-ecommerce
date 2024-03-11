function arrayReducer(cacheArrayWithEanValue, indexValue) {
  const index = cacheArrayWithEanValue.reduce((acc, item) => {
    acc[item.ean] = item.description;
    return acc;
  }, {});

  return index[indexValue];
}

module.exports = arrayReducer;
