/* eslint-disable react/prop-types */
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
  ResponsiveContainer,
  //   Label,
} from "recharts";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const { id } = useParams();
  const LoadedUsers = useLoaderData();
  const axiosOpen = useAxiosOpen();
  const data = LoadedUsers;
  console.log(id);
  const { data: employee } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosOpen.get(`/users/${id}`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="flex flex-col lg:flex-row text-center lg:text-left justify-center mx-auto">
        <div>
          <img
            className="w-1/2 mx-auto rounded-xl"
            src={employee?.photo}
            alt="https://i.ibb.co/N1nwWNp/a.png"
          />
        </div>
        <div className="md:text-2xl">
          <h2>
            <span className=" font-semibold underline">Name: </span>
            {employee?.name}
          </h2>
          <h2>
            <span className=" font-semibold underline">Designation: </span>
            {employee?.designation}
          </h2>
        </div>
      </div>
      {/* Bar Chart */}
      <h1 className="text-center text-3xl font-bold my-5">Salary Chart:</h1>
      <div className="flex justify-center">
        {data.length < 1 ? (
          <p className="text-red-500">Still Did Not Pay Salary!</p>
        ) : (
          <ResponsiveContainer width="90%" height={350}>
            <BarChart
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
              <Bar
                dataKey="salary"
                fill="orange"
                activeBar={<Rectangle fill="green" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Details;
