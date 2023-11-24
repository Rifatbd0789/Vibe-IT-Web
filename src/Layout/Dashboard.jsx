import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import DashNav from "../Dashboard/DashNav'/DashNav";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
        <DashNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
