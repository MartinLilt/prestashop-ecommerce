function openAiReqTemplate(productOptions) {
  const { manufacturer, name, type, size } = productOptions;
  return [
    {
      role: "system",
      content: "You're a SEO marketing professional in ecommerce.",
    },
    {
      role: "user",
      content: `Create a product description that is engaging and clear, 
      including features, benefits, and a call to action. Keep the language friendly.
    
      Manufacturer: ${manufacturer}
      Name: ${name}
      Type: ${type}
      Size: ${size}`,
    },
  ];
}

module.exports = openAiReqTemplate;
