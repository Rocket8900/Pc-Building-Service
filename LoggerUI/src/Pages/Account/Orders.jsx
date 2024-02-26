import { useNavigate } from "react-router-dom";

export function Orders() {
  const navigate = useNavigate();

  function directToOrderDetails() {
    navigate("/order-details");
  }
  return (
    <>
      <h1>Display all Orders here in Table form</h1>
      <div>Each Order item will have a button to go to the order details</div>
      <div>
        <button
          onClick={directToOrderDetails}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Repair Details 1
        </button>
      </div>
    </>
  );
}
