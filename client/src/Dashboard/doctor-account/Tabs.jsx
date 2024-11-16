import React, { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const {dispatch} = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="md:order-1 order-2  mt-8">
      
      <div className="lg:flex flex-col p-[30px] gradient__background items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className="mt-[50px] md:mt-[100px]">
          <button
            onClick={handleLogout}
            className="py-2 bg-slate-950 border border-purple-200 w-full leading-7 rounded-md text-white "
          >
            Logout
          </button>
          <button className="py-2 border w-full border-purple-200 bg-red-600 mt-4 leading-7 rounded-md text-white">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
