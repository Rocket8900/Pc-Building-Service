import { useState, useEffect, useRef } from "react";
import { NoPastOrderPopup } from "./NoPastOrderPopup";
import { Puff } from "react-loader-spinner";

export function RecommendPC() {
  const [auth_key, setAuth_key] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [pastOrderPopup, setPastOrderPopup] = useState(false);
  const [remountKey, setRemountKey] = useState(0); // State to force remount
  const [pcName, setPcName] = useState("");
  const itemTotalRef = useRef(0);

  useEffect(() => {
    itemTotalRef.current = 0; // Reset the total
    cartItems.forEach((part) => {
      itemTotalRef.current += part.part_price; // Accumulate the total
    });
  }, [cartItems]); // This effect runs whenever cartItems changes

  // Retrieve Auth Key from Local storage on mount
  useEffect(() => {
    const auth_key_retrieved = localStorage.getItem("AUTH_KEY");
    setAuth_key(auth_key_retrieved);

    // Check if customer has a past order (CRITERIA)
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/retrieve-customer-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth_key: auth_key_retrieved }),
          }
        );
        if (response.status == 200) {
          retrieveRecommendedProducts(auth_key_retrieved); // Fetch Recommendation Service
        } else if (response.status === 404) {
          setPastOrderPopup(true); // Show No Past Order popup if true
        }
      } catch (e) {
        setPastOrderPopup(true); // Show No Past Order popup if true
        console.error(e);
      }
    };
    fetchOrders();
  }, []);

  function retrieveRecommendedProducts(auth_key_retrieved) {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5800/retrieve-recommended-products`
          `http://localhost:5800/retrieve-recommended-products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth_key: auth_key_retrieved }),
          }
        );
        if (response.status == 200) {
          const data = await response.json();
          setCartItems(data);
          setRemountKey((prev) => prev + 1);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecommendedProducts();
  }

  function addToCart() {
    const addMe = async () => {
      const payload = {
        parts: cartItems,
        pc_name: pcName,
      };

      const cartResponse = await fetch("http://localhost:5002/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_key: auth_key,
          cart_data: { cart_item: payload },
        }),
      });

      if (cartResponse.ok) {
        // Redirect the user after a successful update
        window.location.href = "/cart";
      } else {
        console.error("Failed to update the cart in the cart service.");
      }
    };

    addMe();
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
          <h1 className="text-2xl font-bold mb-6">PC Recommendation Service</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {pastOrderPopup && <NoPastOrderPopup isOpen={pastOrderPopup} />}
            Based on your past orders, here is what we recommend:
            <div className="flex flex-col items-center justify-center h-full mt-3">
              {/* If Cart is still loading, display this */}
              {cartItems.length === 0 ? (
                // Show loading animation here
                <div className="bg-gray-100 p-4 rounded-lg mt-3">
                  <Puff color="#00BFFF" height={100} width={100} />
                </div>
              ) : (
                <>
                  {/* IF CART HAS ITEMS, DISPLAY THIS */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 mt-3">
                      <thead className="bg-gray-50">
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
                      <tbody
                        className="bg-white divide-y divide-gray-200"
                        key={remountKey}
                      >
                        {/* EACH PART */}
                        {cartItems.map((part, index) => {
                          return (
                            <tr
                              key={part.parts_id || index}
                              className="text-gray-700"
                            >
                              {/* Part Name */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-left font-medium text-gray-900">
                                  {part.part_name}
                                </div>
                              </td>
                              {/* Part Price */}
                              <td className="text-sm text-gray-500">
                                ${formatter.format(part.part_price)}
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
                          );
                        })}

                        <tr className="bg-gray-100">
                          <td
                            colSpan="2"
                            className="text-right font-bold text-lg"
                          >
                            Total
                          </td>
                          <td className="text-center font-bold text-lg">
                            $ {formatter.format(itemTotalRef.current)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <label htmlFor="pc_name" className="mr-2">
                      PC Name
                    </label>
                    <input
                      className="border border-blue p-2 rounded-md"
                      id="pc_name"
                      type="text"
                      value={pcName}
                      onChange={(e) => setPcName(e.target.value)}
                    />
                    <button
                      disabled={!pcName}
                      onClick={addToCart}
                      className="inline-flex items-center px-4 py-2 ml-3 mt-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                    >
                      Add to Cart!
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
