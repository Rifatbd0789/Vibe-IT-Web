import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [Role] = useRole();
  const handleLogOut = () => {
    logOutUser()
      .then(() =>
        Swal.fire({
          position: "center",
          icon: "success",
          text: "LogOut Successfully!",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => Swal.fire(err.code));
  };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <>
          {Role?.user === "HR" ? (
            <li>
              <NavLink
                to="/dashboard/hr-home"
                className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
              >
                Dashboard
              </NavLink>
            </li>
          ) : Role?.user === "Employee" ? (
            <li>
              <NavLink
                to="/dashboard/em-home"
                className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
              >
                Dashboard
              </NavLink>
            </li>
          ) : Role?.user === "Admin" ? (
            <li>
              <NavLink
                to="/dashboard/ad-home"
                className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
              >
                Dashboard
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </>
      )}
      {user ? (
        <>
          {/* <li className="">
            <p>{user?.displayName}</p>
          </li> */}
          <li className="lg:hidden">
            <Link onClick={handleLogOut} className="">
              Log Out
            </Link>
          </li>
          <li>
            <div className="dropdown dropdown-end p-1 mr-5 hidden lg:flex">
              <label tabIndex={0} className="avatar">
                <div className="w-12 rounded-full link">
                  <img
                    className=""
                    alt="https://i.ibb.co/N1nwWNp/a.png"
                    src={user?.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-28 z-[10] p-2 shadow menu menu-horizontal dropdown-content  w-24 rounded-lg bg-yellow-300 hidden lg:flex text-black"
              >
                <li>
                  <Link onClick={handleLogOut} className="bg-slate-200">
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? " bg-blue-300 text-black" : ""
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="">
      <div className=" navbar border-2  shadow-md border-warning rounded-3xl ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-yellow-300"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              className="w-8 h-8"
              src="https://i.ibb.co/XybdPMh/logo.png"
              alt=""
            />
            VibeIT
          </Link>
        </div>
        {user && (
          <div className="navbar-end lg:hidden gap-1">
            {/* <p>{user?.displayName}</p> */}
            <div className="w-12 avatar rounded-full ">
              <img className="rounded-full" src={user?.photoURL} />
            </div>
          </div>
        )}

        <div className="navbar-end w-full hidden lg:flex ">
          <ul className="menu menu-horizontal space-x-2 items-center">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
