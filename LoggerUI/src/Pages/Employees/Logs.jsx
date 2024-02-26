import { useState } from "react";
import axios from "axios";
import "/src/index.css";

export function Logs() {
  const TABLE_HEADERS = ["Datetime", "Message", "Username", "User Type"];
  const [data, setData] = useState([]);
  const [tableHeader, setTableHeader] = useState("");

  // Retrieve Log from `retrieve-log` Microservice
  async function retrieveLog(logType) {
    // Reset the array
    setData(() => []);

    // Retrieving via REST API (Use Kong Here?)
    // http://localhost:3900/api/data
    const dataRetrieved = await fetch(
      "http://localhost:8000/api/data?apikey=reader",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          log_type: logType,
        }),
      }
    );

    const jsonData = await dataRetrieved.json();

    // Saving data retrieved to the dataState
    setData((prevState) => [...prevState, ...jsonData]);

    // Setting the Header of the Table
    setTableHeader(() =>
      logType === "Activity_Logs" ? "Activity Log" : "Error Log"
    );
  }

  return (
    <>
      {/*  ___ Button DIVS ___ */}
      <div className="inline-flex space-x-2">
        {/*  Activity Log  */}
        <button
          onClick={() => retrieveLog("Activity_Logs")}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Retrieve Activity Log
        </button>
        {/*  Error Log  */}
        <button
          onClick={() => retrieveLog("Error_Logs")}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Retrieve Error Log
        </button>
      </div>

      {/*  ___ Table DIVS ___ */}
      <div>
        <br />
        <table className="min-w-full divide-y divide-gray-200">
          <caption className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            {tableHeader}
          </caption>
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map((each, index) => {
                return <td key={index}>{each}</td>;
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{each.datetime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{each.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">{each.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{each.usertype}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
