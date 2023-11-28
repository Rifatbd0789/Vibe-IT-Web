/* eslint-disable react/prop-types */
const PayTable = ({ payments }) => {
  return (
    <div>
      <div className="overflow-auto h-64">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Amount</th>
              <th>BankAccount</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.time}</td>
                <td>{payment.salary}</td>

                <td>{payment?.transectionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayTable;
