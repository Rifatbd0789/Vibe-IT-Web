import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { context } from "../ContextProvider/Provider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useContext(context);
  const handleLogOut = () => {
    logOutUser()
      .then(() => Swal.fire({ text: "Logout Successfully!", icon: "success" }))
      .catch((err) => Swal.fire(err.code));
  };
  const allLink = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        {user ? (
          <>
            <p className="text-sm md:text-xl">{user?.displayName}</p>
            <img
              className="w-12 rounded-full mr-2"
              src={user?.photoURL}
              alt=""
            />
            <NavLink
              onClick={handleLogOut}
              // className="btn btn-sm md:btn-md  "
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              // className="btn btn-sm md:btn-md "
            >
              Login
            </Link>
          </>
        )}
        {/* <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Link 1</a>
            </li>
            <li>
              <a>Link 2</a>
            </li>
          </ul>
        </details> */}
      </li>
    </>
  );
  return (
    <div>
      <div className="flex justify-between border border-orange-400 rounded-3xl ">
        <div className="">
          <Link to="/" className="btn btn-ghost text-xl">
            VibeIT
          </Link>
        </div>
        <div className="">
          <ul className="menu menu-horizontal px-1 w-fit">{allLink}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
