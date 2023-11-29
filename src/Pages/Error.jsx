import { Link } from "react-router-dom";
import Button from "../Components/Shared/Button";
const Error = () => {
  return (
    <div className="hero min-h-screen bg-yellow-300">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-black">Sorry!</h1>
        </div>
        <div className="card flex-shrink-0 w-2/5 shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="text-center space-y-5 ">
              <img src="https://i.ibb.co/Z8fPv2z/error.jpg" alt="" />
            </div>
          </div>
          <Link className="mx-auto mb-5" to="/">
            <Button btn="Go Home" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
