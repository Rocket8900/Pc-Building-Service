import { useNavigate } from "react-router-dom";
export function ShowAllRepairs() {
  const navigate = useNavigate();

  function directToEmployeeRepair() {
    navigate("/employee-repair-detail");
  }
  return (
    <>
      <h1>Show all repairs the customers have submitted here</h1>
      <div>Table form:</div>
      <div>
        Each Repair line will have button to select repair & view in details
        <button
          onClick={directToEmployeeRepair}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Repair Details 1 - Employee Facing
        </button>
      </div>
    </>
  );
}
