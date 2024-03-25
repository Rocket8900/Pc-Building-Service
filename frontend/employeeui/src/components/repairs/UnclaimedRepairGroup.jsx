import React from 'react';
import { Link } from 'react-router-dom'; 


const UnclaimedRepairGroup = ({ repairs }) => {

  return (
<div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Created At</th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, index) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4">{repair.RepairID}</td>
                    <td className="whitespace-nowrap px-6 py-4">{repair.CreatedAt}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`/repairs/detail?id=${repair.RepairID}`} className="text-blue-600 hover:underline">View Details</Link>
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
