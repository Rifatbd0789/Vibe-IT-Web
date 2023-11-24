import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";
import HrHome from "../Dashboard/Home/HrHome";
import EmployeeList from "../Dashboard/EmployeeList/EmployeeList";
import EmploHome from "../Dashboard/Home/EmploHome";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // Dashboard
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/hrHome",
        element: <HrHome />,
      },
      {
        path: "/dashboard/emHome",
        element: <EmploHome />,
      },
      {
        path: "/dashboard/employeeList",
        element: <EmployeeList />,
      },
    ],
  },
]);
