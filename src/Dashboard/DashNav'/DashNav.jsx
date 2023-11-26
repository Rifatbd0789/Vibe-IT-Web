import { NavLink } from "react-router-dom";
import useHR from "../../Hooks/useHR";

const DashNav = () => {
  const [Role] = useHR();
  return (
    <div>
      <div>
        <ul className="flex justify-center py-10">
          {Role?.user === "hr" ? (
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
                <NavLink to="/dashboard/hrHome">Last</NavLink>
              </li>
            </>
          ) : (
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
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
