import { useNavigate } from "react-router-dom";

export function Repairs() {
  const navigate = useNavigate();

  function directToRepairDetails() {
    navigate("/repair-details");
  }
  return (
    <>
      <h1>Display all repairs here in Table form</h1>
      <div>Each Repair will have a button to go to the repair details</div>
      <div>
        <button
          onClick={directToRepairDetails}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Repair Details 1
        </button>
      </div>
    </>
  );
}
