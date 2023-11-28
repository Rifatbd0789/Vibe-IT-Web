import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [Role] = useRole();
  const handleLogOut = () => {
    logOutUser()
      .then(() =>
        Swal.fire({
          position: "middle",
          icon: "success",
          text: "LogOut Successfully!",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => Swal.fire(err.code));
  };
  const allLink = (
    <>
      {Role?.user === "HR" ? (
        <li>
          <NavLink
            to="/dashboard/hrHome"
            className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      ) : Role?.user === "Employee" ? (
        <li>
          <NavLink
            to="/dashboard/emHome"
            className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      ) : Role?.user === "Admin" ? (
        <li>
          <NavLink
            to="/dashboard/adHome"
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
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? " bg-orange-400" : "")}
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li className="menu menu-horizontal">
          <p>{user?.displayName}</p>
        </li>
      )}
      <li>
        {user ? (
          <>
            <div className="dropdown dropdown-end  left-0">
              <label tabIndex={0} className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    className=""
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-yellow-300 rounded-box w-52"
              >
                <li>
                  <NavLink
                    onClick={handleLogOut}
                    // className="btn btn-sm md:btn-md  "
                  >
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </div>
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
      </li>
    </>
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between border border-warning rounded-3xl items-center">
        <div className="">
          <Link to="/" className="menu menu-horizontal w-fit text-xl">
            VibeIT
          </Link>
        </div>
        <div className="">
          <ul className="menu menu-horizontal items-center justify-center flex-col md:flex-row">
            {allLink}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
