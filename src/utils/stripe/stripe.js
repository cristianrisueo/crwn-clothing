// Gets sure that what is running is a stripe instance
import { loadStripe } from "@stripe/stripe-js";

// Creates a Stripe API request
export const stripeRequest = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
