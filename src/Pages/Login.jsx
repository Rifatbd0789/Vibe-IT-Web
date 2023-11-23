import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { context } from "../ContextProvider/Provider";
import Swal from "sweetalert2";

const Login = () => {
  const { logInUser, googleLogIn } = useContext(context);
  const [logInerror, setLogInError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setLogInError("");
    logInUser(email, password)
      .then(() => {
        e.target.reset();
        Swal.fire("Successfully! Logged In! ");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => setLogInError(err.code));
  };

  const handleGoogleLog = () => {
    setLogInError("");
    googleLogIn()
      .then(() => {
        Swal.fire(" Successfully! Registered & Logged In!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => setLogInError(error.code));
  };
  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                {logInerror && (
                  <p className="text-red-600 font-semibold">{logInerror}</p>
                )}
                <label className="label">
                  <Link to="/register">
                    New Here? please
                    <span className=" text-blue-600 link link-hover mx-1">
                      Register Here
                    </span>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn  text-white hover:text-black hover:bg-white normal-case">
                  Login
                </button>
              </div>
            </form>
            <button
              onClick={handleGoogleLog}
              className=" mb-2 mx-2 btn btn-outline normal-case  border-none  hover:bg-slate-400 hover:text-black"
            >
              <FcGoogle></FcGoogle>
              Log in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
