const express = require("express");
const axios = require("axios");
const router = express.Router();
const getToken = require("./getToken");

router.post("/", async (req, res) => {
  let { country, currency, id } = req.body;
  const TNX_UNQUIRY = `https://openapiuat.airtel.africa/standard/v1/payments/${id}`;
  try {
    getToken().then((accessToken) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Country": country,
        "X-Currency": currency,
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .get(TNX_UNQUIRY, { headers })
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur lors de l'Operation");
  }
});

module.exports = router;
