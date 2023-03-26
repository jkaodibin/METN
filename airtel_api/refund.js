const express = require("express");
const axios = require("axios");
const router = express.Router();
const getToken = require("./getToken");
const REFUND = "https://openapiuat.airtel.africa/standard/v1/payments/refund";

router.post("/", async (req, res) => {
  let { country, currency, airtel_money_id } = req.body;

  try {
    getToken().then((accessToken) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Country": country,
        "X-Currency": currency,
        Authorization: `Bearer ${accessToken}`,
      };
      const data = {
        transaction: {
          airtel_money_id,
        },
      };
      axios
        .post(REFUND, data, { headers })
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
