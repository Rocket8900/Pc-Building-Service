import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const customerID = "Salah";

  // Retrieve Orders on Mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/retrieve-customer-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: customerID }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setOrders(data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  function redirectToItemDetail(order_id) {
    navigate(`/order-details?orderID=${order_id}`);
  }

  // _______ Formatter _______
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl px-4 py-12 mt-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="flex flex-col items-center justify-center h-full">
          {/* IF CART IS EMPTY, DISPLAY THIS */}
          {orders.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold">You have no past orders.</p>
            </div>
          ) : (
            <>
              {/* IF CART HAS ITEMS, DISPLAY THIS */}
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* EACH PC */}
                {orders.map((order) => {
                  let total = 0;
                  order.order_item.map((item) => {
                    total += item.price;
                  });
                  return (
                    <table key={order.order_id} className="mt-3">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order #
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order Placed
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Deliver to
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{order.order_id}</td>
                          <td>{order.date}</td>
                          <td>$ {formatter.format(total)}</td>
                          <td>{order.customer_id}</td>
                          <td>
                            <a
                              href="#"
                              onClick={() =>
                                redirectToItemDetail(order.order_id)
                              }
                              className="text-sm text-blue-700 hover:text-orange-700 hover:underline"
                            >
                              View order details
                            </a>
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
  );
}
