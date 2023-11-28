/* eslint-disable react/prop-types */
const WorkTable = ({ worksData }) => {
  return (
    <div>
      <div>
        <div className="overflow-auto h-64">
          <table className="table table-pin-rows">
            {/* head */}
            <thead className="divide-y divide-gray-100 bg-warning text-black">
              <tr>
                <th className="border border-black">#</th>
                <th className="border border-black">Task</th>
                <th className="border border-black">Hour</th>
                <th className="border border-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {worksData?.length < 1 ? (
                <tr className="mx-auto my-10 text-center">
                  <td className="border border-black"></td>
                  <td className="text-red-500">
                    No Work! please do work to show here
                  </td>
                </tr>
              ) : (
                worksData?.map((workData, index) => (
                  <tr key={workData?._id}>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">{workData?.task}</td>
                    <td className="border border-black">{workData?.hour}</td>

                    <td className="border border-black">{workData?.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkTable;
