import useAxiosOpen from "../Hooks/useAxiosOpen";
import { FaCheck, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
const Table = ({ header, body, refetch }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
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
      if (res.data.modifiedCount > 0) {
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
        setTransectionId(paymentIntent.id);
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
        console.log("payment saved", res);
        if (res?.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Salary Paid to ${employeeToPay.name} for ${time}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTransectionId("");
          setIsOpen(false);
        }
      }
    }
  };
  return (
    <>
      <div className="overflow-auto rounded-lg shadow">
        <table className="table ">
          {/* head */}
          <thead className="divide-y divide-gray-100">
            <tr>
              <th className="whitespace-nowrap">#</th>
              <th className="whitespace-nowrap">{header.Name}</th>
              <th className="whitespace-nowrap">{header.Email}</th>
              <th className="whitespace-nowrap">{header.Verified}</th>
              <th className="whitespace-nowrap">{header.BankAccount}</th>
              <th className="whitespace-nowrap">{header.Salary}</th>
              <th className="whitespace-nowrap">{header.Pay}</th>
              <th className="whitespace-nowrap">{header.Details}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {body?.map((employee, index) => (
              <tr key={employee._id}>
                <td className="whitespace-nowrap">{index + 1}</td>
                <td className="whitespace-nowrap">
                  <div className="font-bold">{employee.name}</div>
                </td>
                <td className="whitespace-nowrap">{employee.email}</td>
                <td className="whitespace-nowrap">
                  {employee?.Verified === true ? (
                    <>
                      <button
                        onClick={() => verifyUser(employee.email)}
                        className="btn btn-ghost btn-xs w-fit"
                      >
                        <FaCheck />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => verifyUser(employee.email)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTimes />
                    </button>
                  )}
                </td>
                <td className="whitespace-nowrap">{employee?.bank}</td>
                <td className="whitespace-nowrap">{employee?.salary}</td>
                <td className="whitespace-nowrap">
                  <button
                    onClick={() => openModal(employee)}
                    disabled={employee?.Verified === false}
                    className="btn btn-ghost btn-xs"
                  >
                    {header?.Pay}
                  </button>
                </td>
                <td className="whitespace-nowrap">
                  <button className="btn btn-ghost btn-xs">
                    {header?.Details && (
                      <Link to={`/dashboard/details/${employee.email}`}>
                        Details
                      </Link>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                        width: "50%",
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
                <input className="btn" type="submit" value="Pay" />
                <button className="btn" onClick={closeModal}>
                  close
                </button>
              </div>
            </form>
          </div>
          <p className="text-red-600">{error}</p>
          {transectionId && (
            <p className="text-green-600">
              Your Transection id: {transectionId}
            </p>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Table;
