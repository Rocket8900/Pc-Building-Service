import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  function directToCheckout() {
    navigate("/checkout");
  }
  return (
    <>
      <h1>Cart</h1>

      <button
        onClick={directToCheckout}
        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        Checkout!
      </button>
    </>
  );
}
