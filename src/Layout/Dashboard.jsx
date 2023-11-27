import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import DashNav from "../Dashboard/DashNav'/DashNav";
import useRole from "../Hooks/useRole";
const Dashboard = () => {
  const [Role] = useRole();
  return (
    <div>
      {Role?.user ? (
        <div>
          <Navbar />
          <DashNav />
          <Outlet />
        </div>
      ) : (
        <div className=" text-center mt-20 mx-auto ">
          <p className="text-red-500">Nothing is Here please go back</p>
          <Link to="/" className="btn btn-md btn-outline btn-warning">
            Go Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
