require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});

async function descriptionGenerator(optionsArray, numberOfWords = 200) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: optionsArray,
      temperature: 0.7,
      max_tokens: numberOfWords,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating product description:", error);
    return "Unable to generate description.";
  }
}

module.exports = descriptionGenerator;
