/* eslint-disable react/prop-types */
import { useState } from "react";

// import Tilt from "index";
import Tilt from "react-parallax-tilt";
import Button from "./Shared/Button";
import Swal from "sweetalert2";
// import "./ScaleNoTilt.demozap.scss";

const Services = ({ service }) => {
  const [scale] = useState(1.2);
  return (
    <Tilt tiltEnable={false} scale={scale} transitionSpeed={300}>
      <div className="scale-no-tilt">
        <div className="card h-96 glass shadow-xl mx-auto">
          <figure>
            <img src={service.image} alt="https://i.ibb.co/N1nwWNp/a.png" />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{service.title}</h2>
            <p>{service.description}</p>
            <div
              onClick={() =>
                Swal.fire({
                  position: "middle",
                  icon: "info",
                  text: "Please Contact Us for More!",
                  showConfirmButton: false,
                  timer: 1500,
                })
              }
              className="card-actions justify-end"
            >
              <Button btn="Read More!" />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Services;
