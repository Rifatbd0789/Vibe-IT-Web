import { useLoaderData, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  //   ResponsiveContainer,
  //   Label,
} from "recharts";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const user = useParams();
  const LoadedUsers = useLoaderData();
  const axiosOpen = useAxiosOpen();
  const data = LoadedUsers;
  const { data: employee } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosOpen.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row text-center md:text-left justify-center mx-auto">
        <div>
          <img
            className="w-1/2 mx-auto rounded-xl"
            src={employee?.photo}
            alt=""
          />
        </div>
        <div className="text-2xl font-semibold">
          <h2>Name: {employee?.name}</h2>
          <h2>Designation: {employee?.designation}</h2>
        </div>
      </div>
      {/* Bar Chart */}
      <h1 className="text-center text-3xl font-bold my-5">Salary Chart:</h1>
      <div className="flex justify-center">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="salary" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="salary"
            fill="Green"
            activeBar={<Rectangle fill="red" stroke="blue" />}
          />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default Details;
