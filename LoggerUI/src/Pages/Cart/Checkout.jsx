import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve data from previous screens

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // To Fetch the Publishable key from Server (Stripe)
  // http://localhost:3400/api/v1/config
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (total != 0) directToStripePayment();
  }, [total]);

  // Redirect back to cart if null on mount
  useEffect(() => {
    if (location.state == null) {
      navigate("/cart");
    } else {
      setCartItems(location.state.cartItems); // Retrieve data from cart
    }
  }, [location.state, navigate]);

  // Reflect total amount on cartItem change [used on button]
  useEffect(() => {
    if (cartItems.length > 0) {
      setTotal(
        cartItems.reduce((total, eachItem) => {
          return total + eachItem.price * eachItem.quantity;
        }, 0)
      );
    }
  }, [cartItems]);

  // http://localhost:3400/create-payment-intent
  async function directToStripePayment() {
    const clientSecret = await fetch(
      "http://localhost:8000/api/v1/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: total }),
      }
    );

    setClientSecret(await clientSecret.json()); // To initialize the Stripe element
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 mt-10 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="flex justify-center h-full">
            {" "}
            {/* Adjusted for side-by-side layout */}
            {/* Order Summary */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg mr-4">
              {" "}
              {/* Adjusted for width and margin */}
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.length > 0 &&
                    cartItems.map((item) => (
                      <tr key={item.id} className="text-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Total Price</h2>
                <p className="text-2xl font-semibold">$ {total.toFixed(2)}</p>
              </div>
            </div>
            {/* Payment Section */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
              {" "}
              {/* Adjusted for width */}
              {/* Add your payment form or details here */}
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              {/* Payment Element */}
              <div>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={clientSecret}>
                    <StripeCheckoutForm orders={cartItems} total={total} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
