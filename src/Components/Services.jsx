/* eslint-disable react/prop-types */
import { useState } from "react";

// import Tilt from "index";
import Tilt from "react-parallax-tilt";
// import "./ScaleNoTilt.demozap.scss";

const Services = ({ service }) => {
  const [scale] = useState(1.2);
  return (
    <Tilt tiltEnable={false} scale={scale} transitionSpeed={1500}>
      <div className="scale-no-tilt">
        <div className="card h-96 glass mx-auto">
          <figure>
            <img src={service.image} alt="car!" />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{service.title}</h2>
            <p>{service.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn now!</button>
            </div>
          </div>
        </div>
        {/* <div className="header">
          <div>
            <img src={service.image} alt="" />
          </div>
          <div>{service.title}</div>
          <hr />
        </div>
        <div className="form">
          <p>{service.description}</p>
        </div> */}
      </div>
    </Tilt>
  );
};

export default Services;
