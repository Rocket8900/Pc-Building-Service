import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function Cart() {
  const navigate = useNavigate();

  // Holds the Cart items ()
  const [cartItems, setCartItems] = useState([]);

  // Holds the Cart total value
  const [cartTotal, setCartTotal] = useState(undefined);

  // Holds the part details
  const [partDetails, setPartDetails] = useState(undefined);
  const auth_key = localStorage.getItem("AUTH_KEY");

  // Get Cart Data & Total bill on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // http://localhost:5100/retrieve-cart-and-parts
        const response = await fetch(
          `http://localhost:8000/retrieve-cart-and-parts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({ customer_id: customerID }),
            body: JSON.stringify({ auth_key: auth_key }),
          }
        );

        // If Response is ok, then update the cartItem state
        if (response.status === 200) {
          const data = await response.json();

          setCartItems(data.cartItems);
          setPartDetails(data.partDetailList);
          setCartTotal(data.cartTotal);
        }
      } catch (e) {
        console.error("Error fetching cart: ", e);
      }
    };

    fetchData();
  }, []);

  // _______ Update the Cart DB (Deprecated) _______
  function deleteItemFromDb(item_id) {
    // Debounce to limit the frequency of calls
    const debouncedUpdateCartDB = debounce(async () => {
      const payload = { auth_key: auth_key, item_id: item_id };

      try {
        const response = await fetch(`http://localhost:5002/delete-item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status == 200) window.location.reload();
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    }, 1000); // 1000ms delay

    debouncedUpdateCartDB();
  }

  // _______ Direct to checkout page & pass the data to next page _______
  function directToCheckout() {
    navigate("/checkout", {
      state: { cartItems, cartTotal, partDetails, auth_key },
    });
  }

  // _______ Direct to build page _______
  function directToBuild() {
    navigate("/build-pc");
  }

  // _______ Handle Remove From Cart _______
  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.item_id !== itemId
    );
    setCartItems(updatedCartItems);
    deleteItemFromDb(itemId);
  };

  // _______ Clear Cart _______
  function clearCart() {
    const clearCart = async () => {
      // http://localhost:5002/delete-cart (Kong)
      const response = await fetch(`http://localhost:8000/delete-cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth_key: auth_key }),
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* EACH PART */}
                        {item.parts.map((part) => (
                          <tr key={part.parts_id} className="text-gray-700">
                            {/* Part Name */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-left font-medium text-gray-900">
                                {partDetails
                                  ? partDetails[part.parts_id].part_name
                                  : ""}
                              </div>
                            </td>
                            {/* Part Price */}
                            <td className="text-sm text-gray-500">
                              $
                              {partDetails
                                ? formatter.format(
                                    partDetails[part.parts_id].part_price
                                  )
                                : ""}
                            </td>
                            {/* Part Quantity */}
                            <td className="text-center">
                              <div className="flex justify-center space-x-2">
                                <span className="border border-gray-300 rounded-md px-3 py-1">
                                  {part.quantity}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 mt-3">
                          <td>
                            <div className="flex justify-start mt-3 ml-3">
                              <button
                                onClick={() =>
                                  handleRemoveFromCart(item.item_id)
                                }
                                className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                              >
                                Remove PC
                              </button>
                            </div>
                          </td>

                          <td className="text-right font-bold text-lg">
                            <div className="flex justify-start mt-3">Total</div>
                          </td>
                          <td className="text-center font-bold text-lg">
                            <div className="flex justify-start mt-3">
                              ${cartTotal ? formatter.format(cartTotal) : ""}
                            </div>
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
