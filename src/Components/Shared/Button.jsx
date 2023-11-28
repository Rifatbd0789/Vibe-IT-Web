/* eslint-disable react/prop-types */

const Button = ({ btn }) => {
  return (
    <div className="btn btn-warning btn-sm lg:btn-md  shadow-warning shadow-md  border-none   normal-case ">
      {btn}
    </div>
  );
};

export default Button;
