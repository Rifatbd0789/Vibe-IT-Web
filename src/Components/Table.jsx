/* eslint-disable react/prop-types */
const Table = ({ header, body }) => {
  console.log(header);
  return (
    <>
      <div className="">
        <table className="table table-pin-rows table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>{header.Name}</th>
              <th>{header.Email}</th>
              <th>{header.Verified}</th>
              <th>{header.BankAccount}</th>
              <th>{header.Salary}</th>
              <th>{header.Pay}</th>
              <th>{header.Details}</th>
            </tr>
          </thead>
          <tbody>
            {body?.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-bold">{employee.name}</div>
                </td>
                <td>{employee.email}</td>
                <td>{employee?.Verified}</td>
                <td>{employee.bank}</td>
                <td>{employee.salary}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">
                    {header?.Pay}
                  </button>
                </td>
                <td>
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
