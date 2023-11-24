// import { useState } from "react";
import useAxiosOpen from "../Hooks/useAxiosOpen";

/* eslint-disable react/prop-types */
const Table = ({ header, body, refetch }) => {
  //   console.log(header);
  const axiosOpen = useAxiosOpen();
  const verifyUser = (email) => {
    axiosOpen.put(`/users/${email}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };
  return (
    <>
      <div className="overflow-auto rounded-lg shadow">
        <table className="table ">
          {/* head */}
          <thead className="divide-y divide-gray-100">
            <tr>
              <th className="whitespace-nowrap">#</th>
              <th className="whitespace-nowrap">{header.Name}</th>
              <th className="whitespace-nowrap">{header.Email}</th>
              <th className="whitespace-nowrap">{header.Verified}</th>
              <th className="whitespace-nowrap">{header.BankAccount}</th>
              <th className="whitespace-nowrap">{header.Salary}</th>
              <th className="whitespace-nowrap">{header.Pay}</th>
              <th className="whitespace-nowrap">{header.Details}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {body?.map((employee, index) => (
              <tr key={employee._id}>
                <td className="whitespace-nowrap">{index + 1}</td>
                <td className="whitespace-nowrap">
                  <div className="font-bold">{employee.name}</div>
                </td>
                <td className="whitespace-nowrap">{employee.email}</td>
                <td className="whitespace-nowrap">
                  {employee?.Verified === true ? (
                    <>
                      <button
                        onClick={() => verifyUser(employee.email)}
                        className="btn btn-ghost btn-xs"
                      >
                        verified
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => verifyUser(employee.email)}
                      className="btn btn-ghost btn-xs"
                    >
                      not
                    </button>
                  )}
                </td>
                <td className="whitespace-nowrap">{employee.bank}</td>
                <td className="whitespace-nowrap">{employee.salary}</td>
                <td className="whitespace-nowrap">
                  <button className="btn btn-ghost btn-xs">
                    {header?.Pay}
                  </button>
                </td>
                <td className="whitespace-nowrap">
                  <button className="btn btn-ghost btn-xs">
                    {header?.Details}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
