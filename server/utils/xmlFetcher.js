const axios = require("axios");
require("dotenv").config();

async function xmlFetcher(url) {
  try {
    const { data } = await axios.get(url, {
      auth: {
        username: `${process.env.USER_NAME_DB}`,
        password: `${process.env.PASSWORD_DB}`,
      },
      headers: {
        Accept: "application/xml",
      },
      responseType: "text",
    });

    return data;
    

  } catch (error) {
    throw error;
  }
}

module.exports = xmlFetcher;