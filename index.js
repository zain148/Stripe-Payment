const stripe = require("stripe")("sk_test_ThlDssrPmTUhR9DGYEf0A4Le00LbNvGZCO");
//set for local environment request
const express = require("express");
const cors = require("cors");

//const ngrok = require("ngrok");
/*****mAIN THING ABOUT CONNECTING APP WITH LOCAL HOST
 * WE NEED ngrok server that mocks over localhost to
 * https like this
 * we install it using
 * npm install ngrok -g
 * then type ngrok http 8000
 */

const app = express();
//const uuid = require("uuid/v4")

//Middleware
// Automatically allow cross-origin requests for localhost
app.use(cors({ origin: true }));
//this app will use json
app.use(express.json());
//inthis case i'm receiving js
const RandomNumber = Math.floor(Math.random() * 1231231231245454572523);
const idempontencyKey = RandomNumber;
//now this is required to be set the port number to
//the port the heroku will decide

let PortNumber = process.env.PORT || 5000;

app.get("/Payment", (request, response) => {
  // const { amount, currency, token } = request.body;

  stripe.charges
    .create(
      {
        amount: 1000,
        currency: "usd",
        source: "tok_visa",
        description: "Transaction for Lawn Ninja Pay In Advance",
      },
      {
        idempotencyKey: idempontencyKey,
      },
      // this will handle error in stripe and show in console the return message
      function (err, charge) {
        console.log("error", err);
        //this return charge will return the success object
        console.log("Done charge", charge);
      }
    )
    // eslint-disable-next-line promise/always-return
    .then((charge) => {
      response.send(charge);
      // console.log("I'm calling Data outside",Data)
    })
    //this will return status to our frontend with status 200 when it's done
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });

  //closing of post request
});

//to show some message on get requestyh7ggt
app.get("/", (req, res) => {
  res.send("Smoothly on heroku server zain!");
});

//will start hosting like localhost:5000 you'll see message in get
app.listen(PortNumber, () => {
  return console.log("Port is RUnning");
});
