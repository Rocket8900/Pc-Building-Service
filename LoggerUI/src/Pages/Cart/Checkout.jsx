import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve data from previous screens

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // To Fetch the Publishable key from Server (Stripe)
  useEffect(() => {
    fetch("http://localhost:3400/config").then(async (r) => {
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

  async function directToStripePayment() {
    const clientSecret = await fetch(
      "http://localhost:3400/create-payment-intent",
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Order Summary */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
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
              <div>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={clientSecret}>
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
