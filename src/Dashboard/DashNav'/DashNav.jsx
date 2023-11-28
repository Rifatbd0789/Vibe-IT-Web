import { NavLink } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const DashNav = () => {
  const [Role] = useRole();
  return (
    <div>
      <div>
        <ul className=" flex flex-col md:flex-row border-2 border-warning   w-fit  mx-auto my-5  menu  justify-center ">
          {Role?.user === "HR" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/hrHome"
                >
                  Home
                </NavLink>
              </li>
              <div className="divider divider-vertical md:divider-horizontal divider-warning"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/employeeList"
                >
                  Employee List
                </NavLink>
              </li>
              <div className="divider divider-vertical md:divider-horizontal divider-warning"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/progress"
                >
                  Progress
                </NavLink>
              </li>
            </>
          )}
          {Role?.user === "Employee" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/emHome"
                >
                  Home
                </NavLink>
              </li>
              <div className="divider divider-vertical md:divider-horizontal divider-warning"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/paymentHistory"
                >
                  Payment History
                </NavLink>
              </li>
              <div className="divider divider-vertical md:divider-horizontal divider-warning"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/workSheet"
                >
                  Work Sheet
                </NavLink>
              </li>
            </>
          )}
          {Role?.user === "Admin" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/AdHome"
                >
                  Home
                </NavLink>
              </li>
              <div className="divider divider-vertical md:divider-horizontal divider-warning"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " bg-orange-400 justify-center"
                      : "justify-center"
                  }
                  to="/dashboard/allEmployee"
                >
                  All Employee
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
