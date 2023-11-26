import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import PayTable from "./PayTable";

const PaymentHistory = () => {
  const user = useAuth();
  const axiosOpen = useAxiosOpen();

  const { data: paymentsArray, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosOpen.get(`/payments/${user.user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <PayTable payments={paymentsArray} />
    </div>
  );
};

export default PaymentHistory;
