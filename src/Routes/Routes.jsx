import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";
import HrHome from "../Dashboard/Home/HrHome";
import EmployeeList from "../Dashboard/EmployeeList/EmployeeList";
import EmploHome from "../Dashboard/Home/EmploHome";
import Details from "../Dashboard/Details/Details";
import PaymentHistory from "../Dashboard/PaymentHistory/PaymentHistory";
import WorkSheet from "../Dashboard/WorkSheet/WorkSheet";
import Progress from "../Dashboard/ProgressHR/Progress";
import AdHome from "../Dashboard/Home/AdHome";
import AllEmployee from "../Dashboard/AllEmployee/AllEmployee";
import Private from "./Private";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import AdminRoute from "./AdminRoute";

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
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
    children: [
      {
        path: "/dashboard/hrHome",
        element: (
          <HrRoute>
            <HrHome />
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/emHome",
        element: (
          <EmployeeRoute>
            <EmploHome />
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/adHome",
        element: (
          <AdminRoute>
            <AdHome />,
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/employeeList",
        element: (
          <HrRoute>
            <EmployeeList />,
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/allEmployee",
        element: (
          <AdminRoute>
            <AllEmployee />,
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <EmployeeRoute>
            <PaymentHistory />,
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/workSheet",
        element: (
          <EmployeeRoute>
            <WorkSheet />,
          </EmployeeRoute>
        ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <HrRoute>
            <Progress />,
          </HrRoute>
        ),
      },
      {
        path: "/dashboard/details/:id",
        element: (
          <HrRoute>
            <Details />
          </HrRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/dashboard/details/${params?.id}`),
      },
    ],
  },
]);
