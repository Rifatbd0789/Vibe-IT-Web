import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const EmployeeRoute = ({ children }) => {
  const { user, loading, logOutUser } = useAuth();
  const [Role, isRoleLoading] = useRole();
  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && Role?.user === "Employee") {
    return children;
  }
  return (
    logOutUser()
      .then(() =>
        Swal.fire({
          position: "middle",
          icon: "success",
          text: "Please Login With Employee Account!",
          showConfirmButton: false,
          timer: 2500,
        })
      )
      .catch((err) => Swal.fire(err.code)),
    (<Navigate to="/login" />)
  );
};

export default EmployeeRoute;
