import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [total, setTotal] = useState(0);
  const customerID = "Salah";

  // Get Cart Data & Total bill on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/retrieve-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customer_id: customerID }),
        });

        // If Response is ok, then update the cartItem state
        if (response.status === 200) {
          const data = await response.json();

          console.log(data);
          setCartItems(data.data.cart_item);
        }
      } catch (e) {
        console.error("Error fetching cart: ", e);
      }
    };

    fetchData();
  }, []);

  // _______ When the cart updates _______
  useEffect(() => {
    let temp2Total = 0; // For storing total cart value
    const newCart = cartItems.map((item) => {
      let tempTotal = 0; // For storing total value of each item
      const parts = item.parts.map((part) => {
        tempTotal += part.parts_price * part.quantity;
        return part;
      });
      temp2Total += tempTotal;
      return { ...item, parts, price: tempTotal };
    });

    setTotal(temp2Total);
    setUpdatedCart(newCart);
  }, [cartItems]);

  // _______ Update the Cart DB _______
  useEffect(() => {
    console.log("Called");
    // Debounce to limit the frequency of calls
    const debouncedUpdateCartDB = debounce(async () => {
      if (updatedCart.length > 0) {
        const payload = { customer_id: "Salah", cart_item: [...updatedCart] };

        try {
          const response = await fetch(`http://localhost:5000/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          console.error("Error fetching data: ", e);
        }
      }
    }, 1000); // 1000ms delay

    debouncedUpdateCartDB();
  }, [updatedCart]);

  // _______ Direct to checkout page & pass the data to next page _______
  function directToCheckout() {
    navigate("/checkout", { state: { cartItems, total, customerID } });
  }

  // _______ Direct to build page _______
  function directToBuild() {
    navigate("/build-pc");
  }

  // _______ Handle Quantity Change _______
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

  // _______ Handle Remove From Cart _______
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

  // _______ Clear Cart _______
  function clearCart() {
    const clearCart = async () => {
      const response = await fetch(`http://localhost:8000/delete-cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: customerID }),
      });
      // Refresh the page after clearing cart
      if (response.status === 200) window.location.reload();
    };

    clearCart();
  }

  // _______ Formatter _______
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 mt-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {/* IF CART IS EMPTY, DISPLAY THIS */}
            {cartItems.length === 0 ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Your cart is empty.</p>
                <button
                  onClick={directToBuild}
                  className="bg-gray-700 mt-3 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  Build Your PC!
                </button>
              </div>
            ) : (
              <>
                {/* IF CART HAS ITEMS, DISPLAY THIS */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-end">
                    <button
                      onClick={clearCart}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Clear Cart
                    </button>
                  </div>
                  {/* EACH PC */}
                  {cartItems.map((item) => (
                    <table
                      key={item.item_id}
                      className="min-w-full divide-y divide-gray-200 mt-3"
                    >
                      <thead className="bg-gray-50">
                        {/* PC NAME */}
                        <tr>
                          <th
                            colSpan="4"
                            className="px-6 py-3 text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {item.pc_name}
                          </th>
                        </tr>
                        {/* PC PARTS TITLE */}
                        <tr>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            {/* Part Name */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-left font-medium text-gray-900">
                                {part.parts_name}
                              </div>
                            </td>
                            {/* Part Price */}
                            <td className="text-sm text-gray-500">
                              ${formatter.format(part.parts_price)}
                            </td>
                            {/* Part Quantity */}
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
                                  handleRemoveFromCart(
                                    item.item_id,
                                    part.parts_id
                                  )
                                }
                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100">
                          <td
                            colSpan="3"
                            className="text-right font-bold text-lg"
                          >
                            Total
                          </td>
                          <td className="text-center font-bold text-lg">
                            $
                            {updatedCart.map((eachTotal) => {
                              if (eachTotal.item_id === item.item_id) {
                                return formatter.format(eachTotal.price);
                              }
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
                <button
                  onClick={directToCheckout}
                  className="bg-gray-700 mt-3 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  Checkout!
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
