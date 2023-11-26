import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/useAxiosOpen";

const AllEmployee = () => {
  const axiosOpen = useAxiosOpen();
  const { data: users } = useQuery({
    queryKey: ["AllUser"],
    queryFn: async () => {
      const res = await axiosOpen.get("/users");
      return res.data;
    },
  });
  return (
    <div>
      <h1>All Employee: {users?.length}</h1>
    </div>
  );
};

export default AllEmployee;
