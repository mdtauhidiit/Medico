import React from "react";
import convertTime from "../../utils/convertTime";
import { toast } from "react-toastify";
import { BASE_URL, token, RAZORPAY_KEY_ID, COMPANY_NAME } from "../../config";
import { useNavigate } from 'react-router-dom';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const navigate = useNavigate();

  const bookingHandler = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ticketPrice }),
        }
      );
      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message + " Please try again");
      }
      // if (data.session.url) {
      //   window.location.href = data.session.url;
      // }
      const options = {
        key: `${RAZORPAY_KEY_ID}`,
        amount: ticketPrice ,
        currency: "INR",
        name: COMPANY_NAME,
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyResponse = await fetch(`${BASE_URL}/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            navigate("/checkout-success");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: data?.customerName,
          email: data?.customerEmail,
          contact: data?.customerPhone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="gradient__background
 p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold text-white text-[22px]">{ticketPrice} INR</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold gradient__text">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.slice(0, 1).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md bg-slate-950 border-2 border-purple-200">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
