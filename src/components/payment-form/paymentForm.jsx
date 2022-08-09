// React components
import { useState } from "react";

// Redux components
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../redux/cart/cartSelector";

// Stripe components
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Application components
import { BUTTON_TYPE_CLASS } from "../button/button";

// Styled components
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./paymentForm.styles";

export const PaymentForm = () => {
  // Stripe and elements instances
  const stripe = useStripe();
  const elements = useElements();

  // Current user and total amount
  const cartTotal = useSelector(selectCartTotal);
  const { currentUser } = useSelector((state) => state.user);

  // UseState variables and setters
  const [isProcesingPayment, setIsProcesingPayment] = useState(false);

  // Payment event handler
  const paymentHandler = async (event) => {
    // Prevents submit and checks if the hooks are instanciated
    event.preventDefault();
    if (!stripe || !elements) return;

    // Changes the state of the payment to processing
    setIsProcesingPayment(true);

    // Request to the serverless function of Netlify
    const response = await fetch("/.netlify/functions/createPayments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 10000 }),
    }).then((response) => response.json());

    // Gets the stripe secret token to a payment request
    const clientSecret = response.paymentIntent.client_secret;

    // Creates the payment, using the card element from the form
    const payment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest User",
        },
      },
    });

    // Changes the state of the payment to completed
    setIsProcesingPayment(false);

    // Checks the result of the payment
    if (payment.error) {
      alert(payment.error);
    } else {
      if (payment.paymentIntent.status === "succeeded") {
        alert("payment successfull");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton
          text="Make Payment"
          buttonType={BUTTON_TYPE_CLASS.inverted}
          isLoading={isProcesingPayment}
        />
      </FormContainer>
    </PaymentFormContainer>
  );
};
