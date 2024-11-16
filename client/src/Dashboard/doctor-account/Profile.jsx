import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadClaudinary from "../../utils/uploadClaudinary";
import { BASE_URL, token } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ doctorData ,tab,setTab}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      password: doctorData?.password,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  //===============* Functions to update general info*============/
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //=================* Functions to upload image*=============/
  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    const data = await uploadClaudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  //======================* Reusable Functions *=====================/

  //reusable function for adding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable function to delete item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  //reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };
  //===============================================================/

  //============*Functions to updates Qualifications*==============/
  const addQualifications = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      university: "",
      degree: "",
    });
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };
  //===============================================================/

  //============* Functions to updates experience *================/
  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };
  //=============================================================/

  //========* Functions to update timeSlots *=========/
  const addtimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
    console.log(formData.key);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };
  //===================================================/

  //=================* Form Submit handler*=============/
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
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
      setTab('overview')
      navigate("/doctors/profile/me");
      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  //===================================================/

  return (
    <div className="gradient__background px-5 py-4 ]"> 
      <h2 className="gradient__text text-[24px] leading-9 mb-1 ">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="@example.com"
            onChange={handleInputChange}
            readOnly
            aria-readonly
            className="form__input"
            disabled
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div className="mr-2">
              <p className="form__label">Gender*</p>
              <select
                className="form__selectInput"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mr-2">
              <p className="form__label">Specialization*</p>
              <select
                className="form__selectInput"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value>Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="w-full py-1 px-2 border-b border-solid text-[16px] leading-7 text-headingColor placeholder:text-gray-500 cursor-pointer rounded-md border border-gray-800 bg-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50p"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label text-purple-100">Qualifications*</p>
          {formData.qualifications?.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.ending}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            );
          })}

          <button
            onClick={addQualifications}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer border border-purple-200"
          >
            Add Qualifications
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label text-purple-100">Experience*</p>
          {formData.experiences?.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            );
          })}

          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer border border-purple-200"
          >
            Add Experiences
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label text-purple-100">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form__selectInput py-3.5"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={addtimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer border border-purple-200"
          >
            Add TimeSlot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label text-purple-100">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex ietms-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purple-200 flex items-start justify-center">
              <img
                src={formData?.photo}
                alt=""
                className="w-full h-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[120px] h-[50px] bg-slate-950 border border-purple-300 rounded-full ">
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
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] oy-[0.375rem] text-[15px] leading-6 overflow-hidden text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-slate-950 border-2 border-purple-200 rounded-full text-white text-[18px] leading-[30px] w-full py-3 px-4 "
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
