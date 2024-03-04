import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const customerID = "Salah";

  // Get Cart Data & Total bill on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/cart/${customerID}`
        );
        const data = await response.json();
        setCartItems(data.data.cart_item);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, eachItem) => {
        return total + eachItem.price * eachItem.quantity;
      }, 0)
    );
  }, [cartItems]);

  // Direct to checkout & pass the data to next page
  function directToCheckout() {
    navigate("/checkout", { state: { cartItems } });
  }

  const handleQuantityChange = (itemId, partsId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      // Check if the current item matches the itemId
      if (item.item_id === itemId) {
        // Map over the parts to find and update the specific part
        const updatedParts = item.parts.map((part) => {
          // If the part matches the partsId, update its quantity
          if (part.parts_id === partsId) {
            return { ...part, quantity: newQuantity };
          }
          // Otherwise, return the part unchanged
          return part;
        });
        // Return a new item object with the updated parts array
        return { ...item, parts: updatedParts };
      }
      // If the current item does not match the itemId, return it unchanged
      return item;
    });
    // Update the cartItems state with the new updatedCartItems
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId, partsId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.item_id === itemId) {
        const updatedParts = item.parts.filter(
          (part) => part.parts_id !== partsId
        );
        return { ...item, parts: updatedParts }; // Return removed part
      }
      return item; // Unchanged item
    });
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 mt-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Adjusted for vertical centering */}
            {/* Cart Table */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              {/* Added margin-bottom for spacing */}
              {/* EACH PC */}
              {cartItems.map((item) => (
                <table
                  key={item.item_id}
                  className="min-w-full divide-y divide-gray-200"
                >
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
                    {/* EACH PART */}
                    {item.parts.map((part) => (
                      <tr key={part.parts_id} className="text-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {part.parts_id}
                          </div>
                        </td>
                        <td className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.item_id,
                                  part.parts_id,
                                  part.quantity - 1
                                )
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                              -
                            </button>
                            <span className="border border-gray-300 rounded-md px-3 py-1">
                              {part.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.item_id,
                                  part.parts_id,
                                  part.quantity + 1
                                )
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item.item_id, part.parts_id)
                            }
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
                      <td className="text-center font-bold text-lg">
                        ${item.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}

              {/* Old Table */}

              {/* <table className="min-w-full divide-y divide-gray-200">
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
                    <tr key={item.item_id} className="text-gray-700">
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
              </table> */}
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
