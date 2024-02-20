import { useNavigate } from "react-router-dom";
export function Checkout() {
  const navigate = useNavigate();

  function directToOrderConfirmation() {
    navigate("/order-confirmation");
  }
  return (
    <>
      <h1>Checkout Page to finalize the order</h1>
      <div>
        <div>Show order summary</div>
        <button
          onClick={directToOrderConfirmation}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Confirm Order
        </button>
      </div>
    </>
  );
}
