import { useNavigate } from "react-router-dom";
export function PickParts() {
  const navigate = useNavigate();

  function directToSendInvoice() {
    navigate("/send-invoice");
  }
  return (
    <>
      <h1>Page for employee to pick the parts</h1>
      <div>
        After employee picks parts, they click send invoice to generate & send
        to customer
      </div>
      <button
        onClick={directToSendInvoice}
        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        Send Invoice
      </button>
    </>
  );
}
