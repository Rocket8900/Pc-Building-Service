import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NoPastOrderPopup({ isOpen }) {
  const navigate = useNavigate();
  // If popup is not visible, return null
  if (!isOpen) return null;

  function redirectToBuildPC() {
    navigate("/build-pc");
  }

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

      {/* Popup content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4 text-left">
            No Prior Orders Found!
          </h2>
          <div className="text-left">
            To use the PC Recommendation Service, you need to have a past order.
            Please place an order first.
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={redirectToBuildPC}
          >
            Build my first PC!
          </button>
        </div>
      </div>
    </>
  );
}
