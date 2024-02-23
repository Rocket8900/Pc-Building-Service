import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); // Retrieve from useNavigate

  const { cartItems } = location.state; // Retrieve data from cart

  async function directToStripePayment() {
    const stripe = await loadStripe(
      "pk_test_51OmXJ1HQ1nrMbTH7TmSEHBoyfEzxBPWMlPCP5humXfzlDx3IR2ujkwiHeZFt2vLB7gRSD072QyaA9xc8wpFM41Y200glmvQQZn"
    );

    const body = {
      products: retrievedItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${apiURL}/process-payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const jsonData = await response.json();
  }

  // For Total:
  const [total, setTotal] = useState(0);

  // Update the Payment button to reflect total amount on mount
  useEffect(() => {
    setTotal(
      cartItems.reduce((total, eachItem) => {
        return total + eachItem.price * eachItem.quantity;
      }, 0)
    );
  }, []);

  // Deprecated to handle the payment details at StripePayment.jsx
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   address: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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
                  {cartItems.map((item) => (
                    <tr key={item.id} className="text-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.name}</div>
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
              <div></div>
              <button
                onClick={directToStripePayment}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="text-lg">Pay ${total}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
