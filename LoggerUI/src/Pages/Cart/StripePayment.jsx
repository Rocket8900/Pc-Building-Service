import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";

// Publishable Key
const stripePromise = loadStripe(
  "pk_test_51OmXJ1HQ1nrMbTH7TmSEHBoyfEzxBPWMlPCP5humXfzlDx3IR2ujkwiHeZFt2vLB7gRSD072QyaA9xc8wpFM41Y200glmvQQZn"
);

export function StripePayment() {
  return <Elements>{<CheckoutForm />}</Elements>;
}
