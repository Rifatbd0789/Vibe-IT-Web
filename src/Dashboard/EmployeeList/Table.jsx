import useAxiosOpen from "../../Hooks/useAxiosOpen";
import { FaCheck, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Button from "../../Components/Shared/Button";
/* eslint-disable react/prop-types */
const Table = ({ header, body, refetch }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosOpen = useAxiosOpen();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [employeeToPay, setEmployeeToPay] = useState([]);
  const customStyles = {
    content: {
      content: "center",
      height: "70%",
      width: "95%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal(employee) {
    setEmployeeToPay(employee);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  //   const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const verifyUser = (email) => {
    axiosOpen.put(`/users/${email}`).then((res) => {
      if (res?.data) {
        refetch();
      }
    });
  };
  useEffect(() => {
    if (employeeToPay.salary > 0) {
      axiosOpen
        .post("/create-payment-intent", { salary: employeeToPay.salary })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosOpen, employeeToPay.salary]);
  const handlePayment = async (e) => {
    e.preventDefault();
    const time = e.target.time.value;
    // validate the month and year and do not pay for same
    const res = await axiosOpen.get(`/dashboard/details/${employeeToPay?._id}`);
    const filter = res.data.filter((date) => date.time === time);
    console.log(res.data);
    if (filter.length > 0) {
      Swal.fire("You have already paid for that month !");
      return;
    }
    // Payment via Stripe
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error:", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    //Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: employeeToPay?.email || "anonymous",
            name: employeeToPay?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        // seve the payments in the database
        const payment = {
          name: employeeToPay.name,
          photo: employeeToPay.photo,
          designation: employeeToPay.designation,
          email: employeeToPay.email,
          salary: employeeToPay.salary,
          transectionId: paymentIntent.id,
          time: time,
          status: "paid",
        };
        const res = await axiosOpen.post("/payments", payment);
        console.log(res.data);
        if (res?.data) {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: `Salary Paid to ${employeeToPay.name} for ${time}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTransactionId("");
          setIsOpen(false);
        }
      }
    }
  };
  return (
    <div className="overflow-auto h-64 shadow-md">
      <table className="table ">
        {/* head */}
        <thead className=" bg-warning text-black">
          <tr>
            <th className="border border-black">#</th>
            <th className="border border-black">{header.Name}</th>
            <th className="border border-black">{header.Email}</th>
            <th className="border border-black">{header.Verified}</th>
            <th className="border border-black">{header.BankAccount}</th>
            <th className="border border-black">{header.Salary}</th>
            <th className="border border-black">{header.Pay}</th>
            <th className="border border-black">{header.Details}</th>
          </tr>
        </thead>
        <tbody className="">
          {body?.map((employee, index) => (
            <tr key={employee._id}>
              <td className="border border-black ">{index + 1}</td>
              <td className="border border-black ">
                <div className="font-bold">{employee.name}</div>
              </td>
              <td className="border border-black ">{employee.email}</td>
              <td className="border border-black ">
                {employee?.Verified === true ? (
                  <>
                    <button
                      onClick={() => verifyUser(employee?.email)}
                      className="btn btn-ghost btn-xs w-fit"
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => verifyUser(employee?.email)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTimes />
                  </button>
                )}
              </td>
              <td className="border border-black">{employee?.bank}</td>
              <td className="border border-black">{employee?.salary}</td>
              <td className="border border-black">
                <button
                  onClick={() => openModal(employee)}
                  disabled={employee?.Verified === false}
                  className="btn shadow-warning shadow-md btn-warning btn-sm"
                >
                  {header?.Pay}
                </button>
              </td>
              <td className="border border-black">
                <Link
                  className="btn shadow-warning shadow-md btn-outline btn-sm"
                  to={`/dashboard/details/${employee._id}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="space-y-10 text-center mx-0 md:mx-36">
          <p>Name: {employeeToPay.name}</p>
          <h2>Salary: {employeeToPay.salary}</h2>
          <form onSubmit={handlePayment}>
            <input
              required
              className="input input-warning"
              type="month"
              name="time"
            />
            <div className="py-10">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#eab308",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
            <div className="flex gap-10 justify-center">
              <input
                className=" btn shadow-warning shadow-md btn-warning "
                type="submit"
                value="Pay"
              />
              <button onClick={closeModal}>
                <Button btn="Close" />
              </button>
            </div>
          </form>
        </div>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your Transection id: {transactionId}</p>
        )}
      </Modal>
    </div>
  );
};

export default Table;
