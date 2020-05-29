const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Make sure when we install firebase functions
//then package.json
//then cd function then run npm install stripe
//make sure it's downloading in package.json

const stripe = require("stripe")("sk_test_ThlDssrPmTUhR9DGYEf0A4Le00LbNvGZCO");
const uuid = require("uuid/v4");
const idempontencyKey = uuid();
/*
//set for local environment request
const express = require("express");
//ngrok to access local host in expo.
const cors = require("cors");
//const cors = require("cors")({ origin: true });
//const uuid = require("uuid/v4");
const app = express();
//Middleware
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());
//const idempontencayKey = uuid();
const idempontenceyKey = Math.floor(Math.random() * 1231242345512342342423);
const changedToString = idempontenceyKey.toString();
app.post("/Payment", (request, response) => {
  const { amount, currency, token } = request.body;
  // eslint-disable-next-line promise/catch-or-return
  stripe.charges
    .create(
      {
        amount: amount,
        currency: currency,
        source: token,
        description: "The New Transaction Made",
      },
      {
        //idempontencyKey will not allw to make transactions again and again
        //it'll make transaction only one
        idempontenceyKey: changedToString,
        // eslint-disable-next-line promise/always-return
      }
    )
    // eslint-disable-next-line promise/always-return
    .then((charge) => {
      response.send(charge);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/Payment", (req, res) => {
  res.send("Finally wORKING api");
});

exports.Payment = functions.https.onRequest(app);
*/

exports.Payment = functions.https.onRequest((request, response) => {
  //const { amount, currency, token } = request.body;
  stripe.charges
    .create(
      {
        amount: 8000,
        currency: "usd",
        source: "tok_visa",
        description: "New Information",

        // eslint-disable-next-line promise/always-return
      },
      {
        idempontencyKey: idempontencyKey,
      }
    )
    // eslint-disable-next-line promise/always-return
    .then((charge) => {
      response.send(charge);
    })
    .catch((error) => {
      // eslint-disable-next-line no-alert
      console.log(error);
    });
});
