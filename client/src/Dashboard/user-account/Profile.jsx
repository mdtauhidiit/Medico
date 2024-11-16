import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadClaudinary from "../../utils/uploadClaudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
 
  const user= userData

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name ,
      email: user.email ,
      photo: user.photo ,
      gender: user.gender ,
      bloodType: user.bloodType ,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    //TO BE DONE
    const data = await uploadClaudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data?.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-10">
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
            className="form__input" required
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
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="form__input"
            required
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-textColor font-semibold text-[16px] leading-7">
            Gender:
            <select
              value={formData.gender}
              onChange={handleInputChange}
              name="gender"
              className="form__selectInput"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purple-200 flex items-start justify-center">
                <img
                  src={formData.photo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[120px] h-[50px] ">
              <input
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="photo"
                id="customFile"
                accept=".jpg, .png"
                onChange={handleFileInput}
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] oy-[0.375rem] text-[15px] leading-6 overflow-hidden bg-slate-950 text-headingColor font-semibold rounded-lg truncate cursor-pointer border-[1.01px] border-purple-200"
              >
                Upload Photo
              </label>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-1/4 bg-slate-950 border-2 border-purple-200  text-white text-[18px] leading-[30px] rounded-full px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
