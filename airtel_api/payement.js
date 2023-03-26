const express = require("express");
const axios = require("axios");
const router = express.Router();
const getToken = require("./getToken");
const PAYMENT_URL = "https://openapiuat.airtel.africa/merchant/v1/payments/";

router.post("/", async (req, res) => {
  let { reference, subscriber, transaction} = req.body.datas;
  
  try {
    const data = {
      reference,
      subscriber: {
        country: subscriber.country,
        currency: subscriber.currency,
        msisdn: subscriber.msisdn,
      },
      transaction: {
        amount: transaction.amount,
        country: transaction.country,
        currency: transaction.currency,
        id: transaction.id,
      },
    };

    getToken().then((accessToken) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Country": transaction.country,
        "X-Currency": transaction.currency,
        Authorization: `Bearer ${accessToken}`,
      };
      console.log(headers);
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
