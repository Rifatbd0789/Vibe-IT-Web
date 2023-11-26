import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import { useState } from "react";
import Swal from "sweetalert2";

const AllEmployee = () => {
  const axiosOpen = useAxiosOpen();
  const [view, setView] = useState(true);
  const { data: users, refetch } = useQuery({
    queryKey: ["AllUser"],
    queryFn: async () => {
      const res = await axiosOpen.get("/users");
      return res.data;
    },
  });
  const handleMakeHR = async (user) => {
    const res = await axiosOpen.put(`/user/${user.email}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user?.name} is now a HR !`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();
  };
  return (
    <div>
      <div className="text-center space-y-3">
        <h1>All Employee: {users?.length}</h1>
        {view === true ? (
          <button onClick={() => setView(!view)} className="btn">
            Grid View
          </button>
        ) : (
          <button onClick={() => setView(!view)} className="btn">
            Table View
          </button>
        )}
      </div>
      <div className="mx-10 mt-5">
        {view === true ? (
          // Table View
          <div className="overflow-auto h-64">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Role</th>
                  <th>Fire</th>
                </tr>
              </thead>
              <tbody>
                {users?.length < 1 ? (
                  <tr className="mx-auto my-10 text-center">
                    <td></td>
                    <td className="text-red-500">No Data Found !</td>
                  </tr>
                ) : (
                  users?.map((user, index) => (
                    <tr key={user?._id}>
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td>{user?.designation}</td>
                      <td>
                        {user?.role === "Employee" ? (
                          <button
                            onClick={() => handleMakeHR(user)}
                            className="btn"
                          >
                            Make HR
                          </button>
                        ) : (
                          <p>Already {user.role}</p>
                        )}
                      </td>

                      <td>{user?.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-5 gap-5 mx-auto">
            {users?.map((user) => (
              <div
                key={user._id}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={user.photo} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{user.name}</h2>
                  <p>{user.designation}</p>
                  <div className="card-actions justify-between">
                    {user?.role === "Employee" ? (
                      <button
                        onClick={() => handleMakeHR(user)}
                        className="btn"
                      >
                        Make HR
                      </button>
                    ) : (
                      <p className="my-5 text-green-400">Already {user.role}</p>
                    )}
                    <button className="btn">Fire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEmployee;
