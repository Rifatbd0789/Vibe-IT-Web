/* eslint-disable react/prop-types */
const PayTable = ({ payments }) => {
  console.log(payments);
  return (
    <div className="overflow-auto rounded-lg shadow">
      <table className="table ">
        {/* head */}
        <thead className="divide-y divide-gray-100">
          <tr>
            <th className="whitespace-nowrap">#</th>
            <th className="whitespace-nowrap">Month</th>
            <th className="whitespace-nowrap">Amount</th>
            <th className="whitespace-nowrap">BankAccount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments?.map((payment, index) => (
            <tr key={payment._id}>
              <td className="whitespace-nowrap">{index + 1}</td>
              <td className="whitespace-nowrap">
                <div className="font-bold">{payment.time}</div>
              </td>
              <td className="whitespace-nowrap">{payment.salary}</td>

              <td className="whitespace-nowrap">{payment?.transectionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayTable;
