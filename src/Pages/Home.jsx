import { useState } from "react";
import Services from "../Components/Services";
import useAxiosOpen from "../Hooks/useAxiosOpen";
import Testimonial from "../Components/Testimonial";
import Whychoose from "../Components/Whychoose";
import Newsletter from "../Components/Newsletter";
import HeaderTitle from "../Components/Shared/HeaderTitle";

const Home = () => {
  const [services, setServices] = useState([]);
  const axiosOpen = useAxiosOpen();
  axiosOpen.get("/services").then((res) => setServices(res.data));

  return (
    <div>
      {/* Banner */}
      <div>
        <img
          className=" h-[250px] md:h-[400px] lg:h-[550px] w-full mb-5 lg:rounded-lg shadow-black shadow-md"
          src="https://i.ibb.co/jGz2QS9/21532173-6430427.jpg"
          alt="https://i.ibb.co/N1nwWNp/a.png"
        />
      </div>
      <div className="">
        <HeaderTitle title="Services" />
      </div>
      {/* Services */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 mx-5 gap-5 ">
        {services?.map((service) => (
          <Services key={service._id} service={service} />
        ))}
      </div>
      {/* Testimonial */}
      <div className="border-t border-warning">
        <HeaderTitle title="Testimonial" />
        <Testimonial />
      </div>
      {/* Why Choose Us */}
      <div className="border-t border-warning">
        <HeaderTitle title="Why Choose Us!" />
        <Whychoose />
      </div>
      {/* Newsletter */}
      <div className="border-t border-warning">
        <HeaderTitle title="Newsletter" />
        <Newsletter />
      </div>
    </div>
  );
};
export default Home;
