const descriptionGenerator = require("./descriptionGenerator");
const fileReader = require("./fileReader");
const fileWriter = require("./fileWriter");
const openAiReqTemplate = require("../templates/openAiReqTemplate");

const data = [
  {
    ID: "159596",
    TYPE: "Standard package",
    MANUFACTURER: "24 perfumes and colognes",
    LINE: "Elixir Neroli",
    NAME: "Elixir Neroli EDP",
    SIZE: "100ml",
    VARIANT: "",
    VARIANT_CODE: "",
    VARIANT_IMAGE: "",
    SEX: "U",
    IMAGE:
      "https://cmx.prodejparfemu.cz/img/products/2040/521525_elixir_neroli_edp.jpg",
    DESCRIPTION: "",
    PRICE: "19.27",
    STOCK: "4",
    EAN: "3613042123124",
  },
  {
    ID: "159596",
    TYPE: "Standard package",
    MANUFACTURER: "24 perfumes and colognes",
    LINE: "Elixir Neroli",
    NAME: "Elixir Neroli EDP",
    SIZE: "100ml",
    VARIANT: "",
    VARIANT_CODE: "",
    VARIANT_IMAGE: "",
    SEX: "U",
    IMAGE:
      "https://cmx.prodejparfemu.cz/img/products/2040/521525_elixir_neroli_edp.jpg",
    DESCRIPTION: "",
    PRICE: "19.27",
    STOCK: "4",
    EAN: "3613042123127",
  },
];

async function descriptionFilter() {
  try {
    const result = await Promise.all(
      data.map(async (item) => {
        const template = openAiReqTemplate({
          manufacturer: item.MANUFACTURER,
          name: item.NAME,
          type: item.TYPE,
          size: item.SIZE,
        });
        const description = await descriptionGenerator(template);
        return { ean: item.EAN, description: description.trim() };
      })
    );

    await fileWriter(JSON.stringify(result, null, 2), "description.json");
    return result;
  } catch (e) {
    console.error("Error during description filtering:", e);
  }
}

module.exports = descriptionFilter;