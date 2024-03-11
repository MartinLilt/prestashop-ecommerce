const arrayReducer = require('../utils/arrayReducer');

function productToXml(product, conditions, manufacturers, description) {
  const active = product.ACTIVE ? "0" : "1";
  const openAiDescription = arrayReducer(description, product.EAN);
  const conditionState = conditions.includes(product.EAN) ? "new" : "used";
  const manufacturerId = manufacturers[product.MANUFACTURER] || "0";
  const { categoryMap } = require("../vars");
  const categoryId = categoryMap[product.SEX] || "N/A";

  return `
    <product>
      <id><![CDATA[${product.ID}]]></id>
      <name><language id="1"><![CDATA[${product.NAME}]]></language></name>
      <price><![CDATA[${product.PRICE}]]></price>
      <active><![CDATA[${active}]]></active>
      <reference><![CDATA[${product.EAN}]]></reference>
      <quantity><![CDATA[${product.STOCK}]]></quantity>
      <description_short><language id="1"><![CDATA[${product.LINE}]]></language></description_short>
      <description><language id="1"><![CDATA[${openAiDescription}]]></language></description>
      <id_category_default><![CDATA[${categoryId}]]></id_category_default>
      <id_manufacturer><![CDATA[${manufacturerId}]]></id_manufacturer>
      <condition><![CDATA[${conditionState}]]></condition>
      <associations><images><image><image_url><![CDATA[${product.IMAGE}]]></image_url></image></images></associations>
      <type><![CDATA[${product.TYPE}]]></type>
      <size><![CDATA[${product.SIZE}]]></size>
      <sex><![CDATA[${product.SEX}]]></sex>
    </product>`;
}

module.exports = productToXml;
