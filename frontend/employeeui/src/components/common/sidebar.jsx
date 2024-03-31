import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("AUTH_KEY");
    navigate("/");
    
  };

  return (
    <aside className="absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden transition-all duration-300 ease-linear lg:static lg:translate-x-0 bg-gray-800">
      <div className="flex flex-col overflow-y-auto">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="text-sm font-bold bg-blue-900 text-white py-4 text-center">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col">
              <li>
                <NavLink
                  to="/repairs"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-gray-700 ${
                    pathname.includes("/repairs")
                      ? "bg-gray-600"
                      : "bg-gray-500"
                  }`}
                >
                  Repairs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-gray-700 ${
                    pathname === "/orders" ? "bg-gray-600" : "bg-gray-500"
                  }`}
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logs"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-gray-700 ${
                    pathname === "/logs" ? "bg-gray-600" : "bg-gray-500"
                  }`}
                >
                  Logs
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold bg-blue-900 text-white py-4 text-center">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col">
              <li>
                <NavLink
                  onClick={handleSignOut}
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-gray-700 ${
                    pathname === "/signout" ? "bg-gray-600" : "bg-gray-500"
                  }`}
                >
                  Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
