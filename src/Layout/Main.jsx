import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
  return (
    <div className="bg-yellow-300 ">
      <div className="px-5">
        <div className="p-5">
          <Navbar />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
