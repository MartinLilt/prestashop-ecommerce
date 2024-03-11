const prestashopCacheBuilder = require("./prestaCacheBuilder");
const conditionComparator = require("./conditionComparator");
const timeTracker = require("./timeTracker");
const fileWriter = require("./fileWriter");
const fileReader = require("./fileReader");
const {
  vars: { cacheConditions, cacheManufacturers },
} = require("../vars");
const zlib = require("zlib");

async function conditionFilter(options) {
  const time = timeTracker("YYYY-MM-DD");
  try {
    let compressedConditions = JSON.parse(await fileReader("conditions.json"));
    const existingEANs = new Set(compressedConditions.map(({ ean }) => ean));
    const newConditionsArray = options?.filter(
      ({ EAN }) => !existingEANs.has(EAN)
    );

    if (newConditionsArray.length > 0) {
      const updatedConditions = prestashopCacheBuilder(
        newConditionsArray,
        { ean: "EAN", time },
        false
      );
      compressedConditions = [...compressedConditions, ...updatedConditions];
      await fileWriter(compressedConditions, "conditions.json");
    }

    return conditionComparator(compressedConditions, time);
  } catch (error) {
    const conditions = prestashopCacheBuilder(options, { ean: "EAN", time });
    await fileWriter(conditions, "conditions.json");
  }
}

module.exports = conditionFilter;


