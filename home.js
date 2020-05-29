import React from "react";
import { Alert } from "react-native";
import AddSubscriptionView from "./component/AddSubscriptionView";

const STRIPE_ERROR = "Payment service error. Try again later.";
const SERVER_ERROR = "Server error. Try again later.";
const STRIPE_PUBLISHABLE_KEY = "pk_test_yJZKszoukoklUdBu9xnnGUjB00nqYNqReR";

/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React Native apps
 * isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = (creditCardData) => {
  const card = {
    "card[number]": creditCardData.values.number.replace(/ /g, ""),
    "card[exp_month]": creditCardData.values.expiry.split("/")[0],
    "card[exp_year]": creditCardData.values.expiry.split("/")[1],
    "card[cvc]": creditCardData.values.cvc,
  };

  return fetch("https://api.stripe.com/v1/tokens", {
    headers: {
      // Use the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data in request body
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: "post",
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&"),
  }).then((response) => response.json());
};

/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
/**
 * this subscribe function now send request to
 * our backend server
 *
 */
const subscribeUser = async (creditCardToken) => {
  //here i'll extract token ID from json ()
  const tokenId = creditCardToken.id;
  try {
    const response = await fetch("https://lawnninja.herokuapp.com/Payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 500 * 100,
        currency: "usd",
        token: tokenId,
      }),
    }); //first will set the response
    const responseJSON = response.status;

    // console.log(responseJSON);
    //here it'll return status 200
    return responseJSON;
  } catch (error) {
    alert("Unhandled response from stripe backend", error);
  }

  //alert("Done with token");
};

/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default class AddSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
    };
  }

  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;

    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }

    // Send a request to your server with the received credit card token
    //
    const status = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (status !== 200) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      // navigation.navigate("Home");
      Alert.alert("Transaction Completed", "Thanks for your Payment");
    }
  };

  render() {
    const { submitted, error } = this.state;
    return <AddSubscriptionView error={error} submitted={submitted} onSubmit={this.onSubmit} />;
  }
}
