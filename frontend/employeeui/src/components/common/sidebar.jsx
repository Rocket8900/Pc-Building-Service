import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden  duration-300 ease-linear lg:static lg:translate-x-0`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div >
            <h3 className="text-sm font-bold bg-blue-900 text-white py-4 text-center">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col">
              <li>
                <NavLink 
                  to="/repairs"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-graydark ${
                    pathname.includes('/repairs') ? 'bg-slate-600' : 'bg-slate-400'
                  }`}
                >
                  Repairs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/orders"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-graydark ${
                    pathname === '/orders' ? 'bg-slate-600' : 'bg-slate-400'
                  }`}
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/logs"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-graydark ${
                    pathname === '/logs' ? 'bg-slate-600' : 'bg-slate-400'
                  }`}
                >
                  Logs
                </NavLink>
              </li>
            </ul>
          </div>

          <div >
            <h3 className="text-sm font-bold bg-blue-900 text-white py-4 text-center">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col">
              <li>
                <NavLink 
                  to="/signout"
                  className={`group relative flex items-center justify-center py-2 px-4 font-medium text-white hover:bg-graydark ${
                    pathname === '/signout' ? 'bg-slate-600' : 'bg-slate-400'
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
