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
const uuid = require("uuid/v4");
//Middleware
// Automatically allow cross-origin requests for localhost
app.use(cors({ origin: true }));
//this app will use json
app.use(express.json());
//inthis case i'm receiving js
const idempontencyKey = uuid();
//const RandomNumber = Math.floor(Math.random() * 42523);
//const idempontencyKey = RandomNumber;
//now this is required to be set the port number to
//the port the heroku will decide

let PortNumber = process.env.PORT || 5000;

app.post("/Payment", (request, response) => {
  const { amount, currency, token } = request.body;

  stripe.charges
    .create(
      {
        amount: amount,
        currency: currency,
        source: token,
        description: "Pay In Advance Transaction from LawnNinja",
      },
      { idempotencyKey: idempontencyKey }
      /*
      // this will handle error in stripe and show in console the return message
      //here charge will return us the object success
      function (err, charge) {
        console.log("error", err);
        //this return charge will return the success object

        console.log(charge);
      }
      */
    )
    //here response will send it to the stripe
    .then((charge) => {
      response.send(charge);
      // console.log("I'm calling Data outside",Data)
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
