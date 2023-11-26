/* eslint-disable react/prop-types */
const WorkTable = ({ worksData }) => {
  return (
    <div>
      <div>
        <div className="overflow-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Hour</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {worksData?.length < 1 ? (
                <tr className="mx-auto my-10 text-center">
                  <td></td>
                  <td className="text-red-500">
                    No Work! please do work to show here
                  </td>
                </tr>
              ) : (
                worksData?.map((workData, index) => (
                  <tr key={workData?._id}>
                    <td>{index + 1}</td>
                    <td>{workData?.task}</td>
                    <td>{workData?.hour}</td>

                    <td>{workData?.date}</td>
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
