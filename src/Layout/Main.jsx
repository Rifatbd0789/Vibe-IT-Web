import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
  return (
    <div className="bg-yellow-300 px-5">
      <div className="mx-10 py-5">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
