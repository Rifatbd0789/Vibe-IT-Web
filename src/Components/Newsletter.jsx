import Swal from "sweetalert2";
import news from "/5727448_60320.svg";
import Button from "./Shared/Button";
const Newsletter = () => {
  return (
    <div className="mx-5 lg:mx-32">
      <div className="flex flex-col md:flex-row mx-auto my-5 border-2 border-warning justify-center lg:justify-around   rounded-2xl text-center lg:text-left ">
        <div className="card  px-0 md:px-10  max-w-sm md:max-w-2xl ">
          <div className="md:w-full card-body ">
            <img className=" w-full rounded-full" src={news} alt="" />
          </div>
        </div>
        {/* Right  */}
        <div className=" lg:w-2/3 flex rounded-xl  lg:justify-center    ">
          <div className="card ">
            <div className="card-body">
              <h2 className="card-title">
                Wanna know about our software updates, deals and exclusive
                offers ?
              </h2>
              <p>Please Subscribe to our Newsletter and stay updated !</p>

              <input
                type="email"
                className="input input-warning "
                required
                name=""
                placeholder="Email..."
                id=""
              />
              <div className="card-actions justify-end">
                <div
                  onClick={() =>
                    Swal.fire({
                      position: "middle",
                      icon: "success",
                      text: "Thanks! you become a subscriber !",
                      showConfirmButton: false,
                      timer: 1500,
                    })
                  }
                >
                  <Button btn="Subscribe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
