import HeaderTitle from "../../Components/Shared/HeaderTitle";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
const DashHeaderTitle = () => {
  const user = useAuth();
  const [Role] = useRole();
  return (
    <div className="">
      <HeaderTitle title={`Home (${Role?.user})`} />
      <div className="flex justify-center items-center">
        <img className="w-64 rounded-xl" src={user?.user?.photoURL} alt="" />
        <div>
          <h1 className=" text-center mx-20 mb-10 text-3xl  ">
            Hi, Welcome{" "}
            {user?.user?.displayName ? user?.user?.displayName : "Back"}
          </h1>
          <div className="text-center text-2xl space-y-2">
            <p>
              <span className="underline font-medium">Name:</span>{" "}
              <span>{user?.user?.displayName}</span>
            </p>
            <p>
              <span className="underline font-medium">Email:</span>{" "}
              {user?.user?.email}
            </p>
            <p>
              {" "}
              <span className="underline font-medium">Role:</span> {Role?.user}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHeaderTitle;
