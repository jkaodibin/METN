const axios = require("axios");
const querystring = require("querystring");
const TOKEN_URL = "https://openapiuat.airtel.africa/auth/oauth2/token";
const CLIENT_ID = process.env.CL_ID;
const CLIENT_SECRET = process.env.CL_SECRET;

const getToken = async () => {
  try {
    const tokenResponse = await axios.post(
      TOKEN_URL,
      querystring.stringify({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      }
    );

    return tokenResponse.data.access_token;

  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de la récupération du jeton");
  }
};

module.exports = getToken;
