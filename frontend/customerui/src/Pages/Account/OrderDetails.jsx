import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function OrderDetails() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  let totalRef = useRef(0);
  let itemTotalRef = useRef(0);
  const searchParams = new URLSearchParams(window.location.search);
  const orderID = searchParams.get("orderID") || undefined;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          // http://localhost:8000/retrieve-order-detail (Kong)
          `http://localhost:5001/retrieve-order-detail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderID: orderID }),
          }
        );
        const data = await response.json();
        setCartItems(data.data);
      } catch (e) {
        console.error("Error fetching order", e);
      }
    };

    fetchOrder();
  }, []);

  function directBackToAllOrders() {
    navigate("/orders");
  }

  // _______ Formatter _______
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log("FFF", cartItems);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-6xl px-4 py-12 mt-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Order # {orderID}</h1>
          <div className="flex flex-col items-center justify-center h-full">
            {/* IF CART IS EMPTY, DISPLAY THIS */}
            {cartItems.length === 0 ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">Your cart is empty.</p>
                <button
                  onClick={directBackToAllOrders}
                  className="bg-gray-700 mt-3 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  Back to orders
                </button>
              </div>
            ) : (
              <>
                {/* IF CART HAS ITEMS, DISPLAY THIS */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-end">
                    <button
                      onClick={directBackToAllOrders}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Back to orders
                    </button>
                  </div>
                  {/* EACH PC */}
                  {cartItems.order_item.map((item) => {
                    itemTotalRef.current = 0; // Reset the total value of each item
                    return (
                      <table
                        key={item.order_id}
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
                              Sub-total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* EACH PART */}
                          {item.parts.map((part) => {
                            const subTotal = part.parts_price * part.quantity;
                            itemTotalRef.current += subTotal;
                            totalRef.current += subTotal;
                            return (
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
                                    <span className="border border-gray-300 rounded-md px-3 py-1">
                                      {part.quantity}
                                    </span>
                                  </div>
                                </td>
                                {/* Sub-total */}
                                <td className="text-sm text-gray-500">
                                  ${formatter.format(subTotal)}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-gray-100">
                            <td
                              colSpan="3"
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
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
