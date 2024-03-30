import React from "react";
import { useState } from "react";

export const RepairPopup = ({ isOpen, onClose, orderID }) => {
  const [repairTb, setRepairTb] = useState("");
  if (!isOpen) return null; // If popup is not visible, return null
  const token = localStorage.getItem('AUTH_KEY');

  if (!token) {
      console.error('Token not found in local storage');
      return;
  }
  function sendForRepair() {
    // Send to Repair DB here
    const sendRepairData = async (orderID) => {
      const response = await fetch(
        // http://localhost:4200/createrepair
        "http://localhost:8000/repair/createrepair",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
              "OrderID": orderID,
              "Status": "Processing",
              "Description": repairTb
          }),
        }
      );
    };

    // Close the popup
    sendRepairData(orderID);
    onClose();
  }

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

      {/* Popup content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Send for Repair</h2>
          <p className="text-left">What is the problem?</p>
          <textarea
            placeholder="Describe your the problem here."
            value={repairTb}
            onChange={(e) => setRepairTb(e.target.value)}
            className="w-full mt-3 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows="10"
          />
          <button
            className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={sendForRepair}
          >
            Send for repair
          </button>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
