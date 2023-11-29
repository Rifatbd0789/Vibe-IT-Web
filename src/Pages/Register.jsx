import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import useAxiosOpen from "../Hooks/useAxiosOpen";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAuth from "../Hooks/useAuth";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser, googleLogIn } = useAuth();
  const [registerError, setRegisterError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosOpen = useAxiosOpen();
  const onSubmit = async (data) => {
    setRegisterError("");
    // host photo
    const photoFile = { image: data.photo[0] };
    // console.log(photoFile);

    const email = data.email;
    const password = data.password;
    const Name = data.name;
    const role = data.role;
    const designation = data.designation;
    const salary = data.salary;
    const bank = data.bankNo;

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
    const res = await axiosOpen.post(image_hosting_api, photoFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const photo = res.data.data.display_url;
    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: Name,
          photoURL: photo,
        })
          .then(() => {
            const user = {
              email: email,
              name: Name,
              role: role,
              designation: designation,
              salary: salary,
              bank: bank,
              photo: photo,
              Verified: false,
              fire: false,
            };
            axiosOpen.post("/users", user).then((res) => {
              if (res?.data) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  text: `${Name} Successfully Registered !`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/login");
              }
            });
          })
          .catch((error) => setRegisterError(error.code));
        reset();
      })
      .catch((error) => setRegisterError(error.code));
  };

  const handleGoogleReg = () => {
    setRegisterError("");
    googleLogIn()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Successfully! Registered & Logged In! ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => setRegisterError(error));
  };
  return (
    <div>
      <div className=" min-h-screen ">
        <div className="">
          <div className="text-center mb-5 ">
            <h1 className="text-3xl md:text-4xl font-bold ">Register Here!</h1>
          </div>
          <div className=" card border-2 border-warning text-black shadow-xl mx-2 md:mx-5">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex flex-col md:flex-row w-full gap-5">
                {/* Name */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name..."
                    className="input input-bordered"
                    {...register("name")}
                  />
                </div>
                {/* Bank Account no */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Bank Account No:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Bank account no..."
                    className="input input-bordered"
                    {...register("bankNo")}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-5">
                {/* Designation */}
                <div className="md:w-1/2 form-control">
                  <label className="label">
                    <span className="label-text">Designation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Designation..."
                    className="input input-bordered"
                    {...register("designation")}
                  />
                </div>
                {/* Salary */}
                <div className="md:w-1/2 form-control">
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Your Salary..."
                    className="input input-bordered"
                    {...register("salary")}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5">
                {/* Role */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Select your Role</span>
                  </label>
                  <select
                    className="select select-warning w-full "
                    {...register("role", { required: true })}
                    required
                    defaultValue="default"
                  >
                    <option disabled value="default"></option>
                    <option>HR</option>
                    <option>Employee</option>
                  </select>
                </div>
                {/* photo */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="file"
                    {...register("photo")}
                    className="file-input file-input-bordered file-input-warning w-full "
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5">
                {/* Email */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    required
                    className="input input-bordered"
                    {...register("email")}
                  />
                </div>
                {/* Password */}
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    required
                    className="input input-bordered"
                    {...register("password")}
                  />
                </div>
              </div>

              {registerError && (
                <p className="text-red-600 font-semibold">{registerError}</p>
              )}
              <div className="form-control mt-6 text-center">
                <p className="mb-3">
                  Already Have an account ?{" "}
                  <Link to={"/login"}>
                    <span className="text-blue-600 link link-hover mb-2">
                      Login Here..
                    </span>
                  </Link>
                </p>
                {/* <input type="submit" /> */}
                <button className="btn btn-warning  hover:text-black hover:bg-white normal-case ">
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
