import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Repairs from './pages/Repairs'
import RepairDetail from './pages/RepairDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Logs from './pages/Logs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/repairs",
    element: <Repairs />
  },
  {
    path: `/repairs/detail`,
    element: <RepairDetail />
  },
  {
    path: `/orders`,
    element: <Orders />
  },
  {
    path: `/orders/detail`,
    element: <OrderDetail />
  },  
  {
    path: `/logs`,
    element: <Logs />
  },    
]);

const App = () => {
  return (
    <>
     <RouterProvider router={router} /> 
    </>
  );
};

export default App;
