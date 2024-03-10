import { Link } from "react-router-dom";
import React, { useState } from "react";

export function EmployeeNavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">
        {/* Brand logo and name */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="src/assets/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ESDTimez
          </span>
        </Link>
        <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:text-sm  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:space-x-8 md:rtl:space-x-reverse">
          {/* All Repair */}
          <li>
            <Link
              to="/show-all-repairs"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
            >
              All Repairs
            </Link>
          </li>
          {/* Your Repair Cases */}
          <li>
            <Link
              to="/your-cases"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
            >
              Your Cases
            </Link>
          </li>

          {/* Login / Logout Button */}
          <li>
            <Link
              to="/login"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
