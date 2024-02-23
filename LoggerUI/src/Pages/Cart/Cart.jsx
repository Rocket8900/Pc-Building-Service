import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function Cart() {
  const navigate = useNavigate();

  // Direct to checkout & pass the data to next page
  function directToCheckout() {
    navigate("/checkout", { state: { cartItems } });
  }

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 2 },
    { id: 2, name: "Item 2", price: 20, quantity: 1 },
    { id: 3, name: "Item 3", price: 30, quantity: 3 },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, eachItem) => {
        return total + eachItem.price * eachItem.quantity;
      }, 0)
    );
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems.filter((item) => item.quantity > 0));
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Adjusted for vertical centering */}
            {/* Cart Table */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              {/* Added margin-bottom for spacing */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="text-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                          >
                            -
                          </button>
                          <span className="border border-gray-300 rounded-md px-3 py-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="text-right font-bold text-lg">
                      Total
                    </td>
                    <td className="text-center font-bold text-lg">${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={directToCheckout}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Checkout!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
