import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Keep this on loading till data returns

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("[error]", error);
      setLoading(false);
    } else {
      // Send to Backend Payment Server
      const response = await fetch("/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          amount: 1000,
          currency: "sgd",
          paymentMethodId: paymentMethod.id,
        },
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing" : "Pay"}
      </button>
    </form>
  );
}
