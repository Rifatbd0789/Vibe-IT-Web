/* eslint-disable react/prop-types */
const PayTable = ({ payments }) => {
  return (
    <div>
      <div className="overflow-auto h-64  ">
        <table className="table table-pin-rows ">
          {/* head */}
          <thead className="text-black text-center">
            <tr>
              <th className="border border-black">#</th>
              <th className="border border-black">Month</th>
              <th className="border border-black">Amount</th>
              <th className="border border-black">Transaction Id</th>
            </tr>
          </thead>
          <tbody className="text-center text-black">
            {payments?.map((payment, index) => (
              <tr key={payment._id}>
                <td className="border border-black">{index + 1}</td>
                <td className="border border-black">{payment.time}</td>
                <td className="border border-black">{payment.salary}</td>
                <td className="border border-black">
                  {payment?.transectionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayTable;
