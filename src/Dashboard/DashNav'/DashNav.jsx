import { NavLink } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const DashNav = () => {
  const [Role] = useRole();
  return (
    <div>
      <div>
        <ul className="flex justify-center px-2 py-10">
          {Role?.user === "HR" && (
            <>
              <li>
                <NavLink to="/dashboard/hrHome">Home</NavLink>
              </li>
              <div className="divider divider-horizontal divider-warning"></div>
              <li>
                <NavLink to="/dashboard/employeeList">Employee List</NavLink>
              </li>
              <div className="divider divider-horizontal divider-warning"></div>
              <li>
                <NavLink to="/dashboard/progress">Progress</NavLink>
              </li>
            </>
          )}
          {Role?.user === "Employee" && (
            <>
              <li>
                <NavLink to="/dashboard/emHome">Home</NavLink>
              </li>
              <div className="divider divider-horizontal divider-warning"></div>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  Payment History
                </NavLink>
              </li>
              <div className="divider divider-horizontal divider-warning"></div>
              <li>
                <NavLink to="/dashboard/workSheet">Work Sheet</NavLink>
              </li>
            </>
          )}
          {Role?.user === "Admin" && (
            <>
              <li>
                <NavLink to="/dashboard/AdHome">Home</NavLink>
              </li>
              <div className="divider divider-horizontal divider-warning"></div>
              <li>
                <NavLink to="/dashboard/allEmployee">All Employee</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
