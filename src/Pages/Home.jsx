import { useState } from "react";
import Services from "../Components/Services";
import useAxiosOpen from "../Hooks/useAxiosOpen";

const Home = () => {
  const [services, setServices] = useState([]);
  const axiosOpen = useAxiosOpen();
  axiosOpen.get("/services").then((res) => setServices(res.data));

  return (
    <div>
      {/* Banner */}
      <div>
        <img
          className=" h-[250px] md:h-[400px] lg:h-[550px] w-full mb-5 rounded-3xl shadow-black shadow-2xl"
          src="https://i.ibb.co/jGz2QS9/21532173-6430427.jpg"
          alt=""
        />
      </div>
      {/* Services */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 mx-5 gap-5">
        {services?.map((service) => (
          <Services key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};
export default Home;
