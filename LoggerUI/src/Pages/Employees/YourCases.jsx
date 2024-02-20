import { useNavigate } from "react-router-dom";

export function YourCases() {
  const navigate = useNavigate();

  function directToCaseDetail() {
    navigate("/employee-repair-detail");
  }
  return (
    <>
      <div>
        This page will display all the cases that the employee is handling
      </div>
      <div>
        <button
          onClick={directToCaseDetail}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Repair Case Detail
        </button>
      </div>
    </>
  );
}
