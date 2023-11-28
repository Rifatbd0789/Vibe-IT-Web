import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/useAxiosOpen";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Table from "./Table";
// Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
const EmployeeList = () => {
  const axiosOpen = useAxiosOpen();

  const { data: employeeInfo, refetch } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosOpen.get("/employee");
      return res.data;
    },
  });
  const header = {
    Name: "Name",
    Email: "Email",
    Verified: "Verified",
    BankAccount: "Bank Account",
    Salary: "Salary",
    Pay: "Pay",
    Details: "Details",
  };

  return (
    <div>
      <p className="text-center font-bold text-3xl my-5">
        Total Employee: {employeeInfo?.length}
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <Table header={header} body={employeeInfo} refetch={refetch} />
        </Elements>
      </div>
    </div>
  );
};

export default EmployeeList;
