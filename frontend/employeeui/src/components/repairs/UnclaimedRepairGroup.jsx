import React from "react";
import { useNavigate } from "react-router-dom";

const UnclaimedRepairGroup = ({ repairs }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, index) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:text-white"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {repair.RepairID}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {repair.CreatedAt}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/repairs/detail?id=${repair.RepairID}`)
                        }
                        className="bg-blue-900 text-white hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnclaimedRepairGroup;
