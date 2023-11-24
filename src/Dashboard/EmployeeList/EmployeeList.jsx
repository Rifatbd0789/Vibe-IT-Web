import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import Table from "../../Components/Table";
const EmployeeList = () => {
  const axiosOpen = useAxiosOpen();
  const { data: employeeInfo } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosOpen.get("/users");
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
      <p className="text-center text-3xl my-5">
        Total Employee: {employeeInfo?.length}
      </p>
      <div>
        <Table header={header} body={employeeInfo} />
      </div>
    </div>
  );
};

export default EmployeeList;
