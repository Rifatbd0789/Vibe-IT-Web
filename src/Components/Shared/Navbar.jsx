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
                    alt="https://i.ibb.co/N1nwWNp/a.png"
                    src={user?.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-28 z-[1] p-2 shadow menu menu-horizontal dropdown-content bg-yellow-300  w-24 rounded-lg"
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
      <div className="flex flex-col md:flex-row md:justify-between border-2 shadow-md border-warning rounded-3xl items-center">
        <div className="">
          <Link
            to="/"
            className="menu     menu-vertical md:menu-horizontal w-fit text-xl"
          >
            <div className="w-12 mr-2">
              <img
                className="rounded-full "
                alt="https://i.ibb.co/N1nwWNp/a.png"
                src="https://i.ibb.co/XybdPMh/logo.png"
              />
            </div>
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
