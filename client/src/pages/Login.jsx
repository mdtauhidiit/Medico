import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });
     
      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0 ">
      <div
        className="w-full max-w-[500px] mx-auto  mt-16 py-5 shadow-md md:p-10 rounded-lg border border-gray-900 bg-gradient-to-tr from-gray-950 to-gray-900
"
      >
        <h3 className="text-headingColor text-center text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome </span>Back
        </h3>
        <form className="py-4 md:py-0 px-5" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form__input py-3"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form__input py-3"
              required
            />
          </div>
          <div className="mt-7 text-center">
            <button
              type="submit"
              className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                {loading ? <HashLoader size={25} color="#ffffff" /> : "Login"}
              </span>
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have and account?
            <Link className="font-bold text-primaryColor ml-1" to="/signup">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
