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
            className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      ) : Role?.user === "Employee" ? (
        <li>
          <NavLink
            to="/dashboard/emHome"
            className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      ) : Role?.user === "Admin" ? (
        <li>
          <NavLink
            to="/dashboard/adHome"
            className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? " bg-slate-200" : "")}
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <p>{user?.displayName}</p>
        </li>
      )}
      <li>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
            {/* <div className="flex">
              <div>
                <p className="text-sm">{user?.displayName}</p>
              </div>
              <details>
                <summary>
                  <img
                    className="w-12 rounded-full mr-2"
                    src={user?.photoURL}
                    alt=""
                  />
                </summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </div> */}
            {/* <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">
                  <img
                    className="w-12 rounded-full mr-2"
                    src={user?.photoURL}
                    alt=""
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <NavLink
                    onClick={handleLogOut}
                    // className="btn btn-sm md:btn-md  "
                  >
                    Log Out
                  </NavLink>
                </ul>
              </div> */}
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
