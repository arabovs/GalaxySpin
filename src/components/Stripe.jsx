import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }

    const res = await fetch("/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    const { stripe } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe}
          style={{ alignItems: "center", textAlign: "center", marginTop: 10 }}
        >
          Play now!
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Stripe = () => (
  <Elements stripe={stripePromise} options={options}>
    <InjectedCheckoutForm />
  </Elements>
);

export default Stripe;
