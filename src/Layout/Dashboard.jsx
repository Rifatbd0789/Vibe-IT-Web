import { Link, Outlet } from "react-router-dom";
import DashNav from "../Dashboard/DashNav'/DashNav";
import useRole from "../Hooks/useRole";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
const Dashboard = () => {
  const [Role] = useRole();
  return (
    <div>
      {Role?.user ? (
        <div className="bg-yellow-300 ">
          <div className="lg:px-3">
            <div className="p-5">
              <Navbar />
            </div>
            <DashNav />
            <Outlet />
          </div>
          <Footer />
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
