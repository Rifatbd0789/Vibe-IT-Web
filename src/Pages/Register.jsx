import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { context } from "../ContextProvider/Provider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, googleLogIn } = useContext(context);
  const [registerError, setRegisterError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const Name = form.get("displayName");
    const photo = form.get("photo");

    setRegisterError("");

    // password Validation
    if (password.length < 6) {
      setRegisterError(
        "Registration Failed !  Password must be more than 6 character !"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Registration Failed !  Password must include at least one Capital letter !"
      );
      return;
    } else if (!/[#?!@$%^&*-]/.test(password)) {
      setRegisterError(
        "Registration Failed !  Password must include a special character!"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: Name,
          photoURL: photo,
        })
          .then()
          .catch((error) => setRegisterError(error.code));
        e.target.reset();
        Swal.fire(`${Name} Successfully Registered !`);
        navigate("/login");
      })
      .catch((error) => setRegisterError(error.code));
  };

  const handleGoogleReg = () => {
    setRegisterError("");
    googleLogIn()
      .then(() => {
        Swal.fire(" Successfully Registered & Logged In!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => setRegisterError(error));
  };
  return (
    <div>
      <div className="hero min-h-screen  ">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl text-white font-bold ">
              Register Here!
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name..."
                  className="input input-bordered"
                  name="displayName"
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  placeholder="Your photo url..."
                  className="input input-bordered"
                  name="photo"
                />
              </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
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
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              {registerError && (
                <p className="text-red-600 font-semibold">{registerError}</p>
              )}
              <div className="form-control mt-6">
                <p className="mb-3">
                  Already Have an account ?{" "}
                  <Link to={"/login"}>
                    <span className="text-blue-600 link link-hover mb-2">
                      Login Here..
                    </span>
                  </Link>
                </p>
                <button className="btn  text-white hover:text-black hover:bg-white normal-case ">
                  Register
                </button>
              </div>
            </form>
            <button
              onClick={handleGoogleReg}
              className=" mb-2 mx-2 btn btn-outline normal-case text-[#29465B] border-none  hover:bg-slate-400 hover:text-black"
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

export default Register;
