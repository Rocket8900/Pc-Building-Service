import { useNavigate } from "react-router-dom";

export function EmployeeRepairDetail() {
  const navigate = useNavigate();

  function directToPickParts() {
    navigate("/pick-parts");
  }

  function directToRepairCompleted() {
    navigate("/repair-completed");
  }

  return (
    <>
      <h1>
        View Repair detail for employee - They can view details of repair
        request submitted by customers
      </h1>
      <div>Show all the repair details here</div>

      <div>
        <h1>Pick Parts Section Here</h1>
        <button
          onClick={directToPickParts}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Pick Parts
        </button>
      </div>
      <div>
        <h1>Repair Completed Section Here</h1>
        <button
          onClick={directToRepairCompleted}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Repair Completed
        </button>
      </div>
    </>
  );
}
