// import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosOpen from "../Hooks/useAxiosOpen";
import { FaCheck, FaTimes } from "react-icons/fa";
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
  const handlePayment = async (employee) => {
    const { value: time } = await Swal.fire({
      title: "Choose Check In Date",
      text: `Salary: ${employee.salary}`,
      inputAttributes: {
        required: "true",
      },
      input: "month",
      showCancelButton: true,
      showConfirmButton: true,
      inputLabel: "Check In Date",
    });
    if (time === undefined) {
      return;
    }
    // const PayInfo = {
    //   email: employee.email,
    //   month: time,
    // };
    console.log(time);
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
                        className="btn btn-ghost btn-xs w-fit"
                      >
                        <FaCheck />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => verifyUser(employee.email)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTimes />
                    </button>
                  )}
                </td>
                <td className="whitespace-nowrap">{employee?.bank}</td>
                <td className="whitespace-nowrap">{employee?.salary}</td>
                <td className="whitespace-nowrap">
                  <button
                    onClick={() => handlePayment(employee)}
                    disabled={employee?.Verified === false}
                    className="btn btn-ghost btn-xs"
                  >
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
