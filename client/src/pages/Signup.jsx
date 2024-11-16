import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link, useNavigate } from "react-router-dom";
import uploadClaudinary from "../utils/uploadClaudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    //TO BE DONE
    const data = await uploadClaudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 ">
      <div className="max-w-[500px] sm:mx-auto mt-16 mx-8">
        <div className="grid ">
          {/* ========Image Box========  */}
          {/* <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} className="w-full rounded-l-lg" />
            </figure>
          </div> */}

          {/*============ sign up form ============ */}

          <div className=" rounded-lg p-8 border border-gray-900 bg-gradient-to-tr from-gray-950 to-gray-900">
            <h3 className="text-headingColor text-[22px] text-center leading-9 font-bold mb-8">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form__input"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form__input"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form__input"
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-textColor font-semibold text-[16px] leading-7">
                  Are you a: 
                  <select
                    value={formData.role}
                    onChange={handleInputChange}
                    name="role"
                    className="form__selectInput"
                  >
                    <option value="">Select</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label className="text-textColor font-semibold text-[16px] leading-7">
                  Gender:
                  <select
                    value={formData.gender}
                    onChange={handleInputChange}
                    name="gender"
                    className="form__selectInput">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center  gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purple-300 flex items-start justify-center">
                    <img
                      src={previewURL}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[120px] h-[50px] border-purple-300 border-2 rounded-full">
                  <input
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                    onChange={handleFileInput}
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-slate-950 text-headingColor font-semibold rounded-full truncate cursor-pointer "
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                    {loading ? (
                      <HashLoader size={25} color="#ffffff" />
                    ) : (
                      "Signup"
                    )}
                  </span>
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have and account?
                <Link className="font-bold text-primaryColor ml-1" to="/login">
                  {" "}
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
