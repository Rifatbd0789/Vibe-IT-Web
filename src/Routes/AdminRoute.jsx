import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading, logOutUser } = useAuth();
  const [Role, isRoleLoading] = useRole();
  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center ">
        <span className="loading loading-spinner text-yellow-400 mt-36 pt-36 pl-36"></span>
      </div>
    );
  }
  if (user && Role?.user === "Admin") {
    return children;
  }
  return (
    logOutUser()
      .then(() =>
        Swal.fire({
          position: "middle",
          icon: "error",
          text: "Please Login With Admin Account!",
          showConfirmButton: false,
          timer: 2500,
        })
      )
      .catch((err) => Swal.fire(err.code)),
    (<Navigate to="/login" />)
  );
};

export default AdminRoute;
