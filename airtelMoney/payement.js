const express = require("express");
const axios = require("axios");
const router = express.Router();
const getToken = require("./getToken");
const PAYMENT_URL = "https://openapiuat.airtel.africa/merchant/v1/payments/";

router.post("/", async (req, res) => {
  let { reference, country, currency, msisdn, amount, id } = req.body;

  try {
    const data = {
      reference,
      subscriber: {
        country,
        currency,
        msisdn,
      },
      transaction: {
        amount,
        country,
        currency,
        id,
      },
    };

    getToken().then((accessToken) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Country": country,
        "X-Currency": currency,
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .post(PAYMENT_URL, data, { headers })
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
