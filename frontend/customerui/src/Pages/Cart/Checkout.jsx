import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve data from previous screens
  const { pathname } = useLocation();

  const [auth_key, setAuth_key] = useState("");
  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [partDetails, setPartDetails] = useState();
  const [total, setTotal] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // ______ USED FOR FOCUSING ON TOP OF PAGE ON MOUNT ______
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // ______ RETRIEVE DATA FROM PREVIOUS PAGE ______
  useEffect(() => {
    // Redirect back to cart if null on mount
    if (location.state == undefined) navigate("/cart");

    setCartItems(location.state.cartItems); // Retrieve cart from previous Cart Page
    setCartTotal(location.state.cartTotal.toFixed(2)); // Retrieve cart total from previous Cart Page
    setTotal(location.state.cartTotal.toFixed(2));
    setPartDetails(location.state.partDetails); // Retrieve cart from previous Cart Page
    setAuth_key(location.state.auth_key); // Retrieve Customer ID from previous Cart Page
  }, [location.state, navigate]);

  // ______ STRIPE STUFF ______
  // To Fetch the Publishable key from Server (Stripe)
  useEffect(() => {
    // http://localhost:3400/fetch-publishable-key (Kong)
    fetch("http://localhost:8000/fetch-publishable-key").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  async function directToStripePayment() {
    const clientSecret = await fetch(
      // http://localhost:3400/create-payment-intent (Kong)
      "http://localhost:8000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: cartTotal }),
      }
    );
    setClientSecret(await clientSecret.json()); // To initialize the Stripe element
  }

  // _______ Formatter _______
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // _______ Direct to checkout & pass the data to next page _______
  function backToCart() {
    navigate("/cart");
  }

  // Checks if there's a cartTotal & stripePromise before calling stripePayment
  useEffect(() => {
    if (cartTotal != 0 && stripePromise) {
      directToStripePayment();
    }
  }, [cartTotal, stripePromise]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 mt-10 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="flex justify-center h-full">
            {" "}
            {/* Order Summary */}
            <div className="w-3/5 bg-gray-100 p-4 rounded-lg mr-4">
              <button
                onClick={backToCart}
                className="align-left bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Back to Cart
              </button>
              <h3 className="text-lg font-semibold mt-3 mb-4">Order Summary</h3>
              <div className="overflow-x-auto">
                {cartItems
                  ? cartItems.map((item) => (
                      <table
                        key={item.item_id}
                        className="min-w-full divide-y divide-gray-200 mt-3"
                      >
                        <thead className="bg-gray-50">
                          <tr className="text-gray-700">
                            <th
                              colSpan="4"
                              className="px-6 py-3 text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {item.pc_name}
                            </th>
                          </tr>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {item.parts.map((part) => (
                            <tr key={part.parts_id} className="text-gray-700">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-left font-medium text-gray-900">
                                  {partDetails
                                    ? partDetails[part.parts_id].part_name
                                    : ""}
                                </div>
                              </td>
                              <td className="text-sm text-gray-500">
                                $
                                {partDetails
                                  ? formatter.format(
                                      partDetails[part.parts_id].part_price
                                    )
                                  : ""}
                              </td>
                              <td className="text-center">
                                <div className="flex justify-center space-x-2">
                                  <span className="border border-gray-300 rounded-md px-3 py-1">
                                    {part.quantity}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100">
                            <td
                              colSpan="3"
                              className="font-bold text-right-total text-lg px-6 py-2 whitespace-nowrap"
                            >
                              Total: $
                              {cartTotal ? formatter.format(cartTotal) : ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))
                  : ""}
              </div>
              {/* Total price display */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Total Price</h2>
                <p className="text-2xl font-semibold">
                  $ {formatter.format(total)}
                </p>
              </div>
            </div>
            {/* Payment Section */}
            <div className="w-2/5 bg-gray-100 p-4 rounded-lg">
              {" "}
              {/* Adjusted for width */}
              {/* Add your payment form or details here */}
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              {/* Payment Element */}
              <div>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={clientSecret}>
                    <StripeCheckoutForm
                      orders={cartItems}
                      auth_key={auth_key}
                    />
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
