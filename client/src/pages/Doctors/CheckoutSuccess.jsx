import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <div className="text-green-500 text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction was successful, and a
          confirmation email has been sent to you.
        </p>
        <p className="text-gray-600 mb-6">Have a great day!</p>
        <div className="py-10 text-center">
          <Link className='px-12 py-3 text-white font-semibold bg-primaryColor rounded-lg ' to="/home">Go Back To Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
