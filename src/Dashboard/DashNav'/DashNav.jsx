import { NavLink } from "react-router-dom";

const DashNav = () => {
  return (
    <div>
      <div>
        <ul className="flex justify-center py-10">
          <li>
            <NavLink to="/dashboard/employeeList">Employee List</NavLink>
          </li>
          <div className="divider divider-horizontal divider-warning"></div>
          <li>
            <NavLink to="/dashboard/employeeList">Employee List</NavLink>
          </li>
          <div className="divider divider-horizontal divider-warning"></div>
          <li>
            <NavLink to="/dashboard/employeeList">Employee List</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
