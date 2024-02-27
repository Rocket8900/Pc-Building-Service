import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// ____ MISC PAGES ____
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";

// ____ BUILD PAGES ____
import { BuildPC } from "./Pages/Build/BuildPC";

// ____ REPAIR PAGES ____
import { RepairPC } from "./Pages/Repair/RepairPC";

// ____ ACCOUNT PAGES ____
import { Account } from "./Pages/Account/Account";
import { Orders } from "./Pages/Account/Orders";
import { OrderDetails } from "./Pages/Account/OrderDetails";
import { Repairs } from "./Pages/Account/Repairs";
import { RepairDetails } from "./Pages/Account/RepairDetails";

// ____ CART PAGES ____
import { Cart } from "./Pages/Cart/Cart";
import { Checkout } from "./Pages/Cart/Checkout";
import { Completion } from "./Pages/Cart/Completion";

// ____ EMPLOYEE PAGES ____
import { Logs } from "./Pages/Employees/Logs";
import { ShowAllRepairs } from "./Pages/Employees/ShowAllRepairs";
import { YourCases } from "./Pages/Employees/YourCases";
import { EmployeeRepairDetail } from "./Pages/Employees/EmployeeRepairDetail";
import { PickParts } from "./Pages/Employees/PickParts";
import { SendInvoice } from "./Pages/Employees/SendInvoice";
import { RepairCompleted } from "./Pages/Employees/RepairCompleted";

// Components
import { NavBar } from "./Components/NavBar";
import { EmployeeNavBar } from "./Components/EmployeeNavBar";
import { AdminNavBar } from "./Components/AdminNavBar";
import { Footer } from "./Components/Footer";

function App() {
  // User Type Placeholder for testing:
  const typeOfUser = "customer";

  // Hold what type of User here
  const [userType, setUserType] = useState(typeOfUser);

  // Display either Customer / Employee Navbar
  let navbar;

  // Handles switching
  switch (userType) {
    case "customer":
      navbar = <NavBar />;
      break;
    case "employee":
      navbar = <EmployeeNavBar />;
      break;
    case "admin":
      navbar = <AdminNavBar />;
      break;
  }

  return (
    <>
      {/* Checks to conditionally display navbar */}
      {navbar}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        <Route path="/build-pc" element={<BuildPC />} />

        <Route path="/repair-pc" element={<RepairPC />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/completion" element={<Completion />} />

        <Route path="/account" element={<Account />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/repair-details" element={<RepairDetails />} />
        <Route path="/repairs" element={<Repairs />} />

        <Route
          path="/employee-repair-detail"
          element={<EmployeeRepairDetail />}
        />
        <Route path="/your-cases" element={<YourCases />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/pick-parts" element={<PickParts />} />
        <Route path="/repair-completed" element={<RepairCompleted />} />
        <Route path="/send-invoice" element={<SendInvoice />} />
        <Route path="/show-all-repairs" element={<ShowAllRepairs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
