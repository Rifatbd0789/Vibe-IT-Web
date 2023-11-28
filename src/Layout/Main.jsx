import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const Main = () => {
  return (
    <div className="bg-yellow-300 ">
      <div className="lg:px-3">
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
