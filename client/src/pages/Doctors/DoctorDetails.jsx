import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import FeedBack from "./FeedBack";
import SidePanel from "./SidePanel";
import useFetchData from "../../Hooks/useFetchData";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Capitalize from "../../utils/capitalizeString";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const {
    data,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    email,
    phone,
    password,
    bio,
    gender,
    specialization,
    ticketPrice,
    qualifications,
    experiences,
    timeSlots,
    about,
    photo,
    averageRating,
    totalRating,
    reviews,
  } = data;
  return (
    <section className="">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="" />
                </figure>
                <div className="mt-8">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:leading-7 font-semibold rounded">
                    {specialization && Capitalize(specialization)}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon}></img>
                      <img src={starIcon}></img>
                      <img src={starIcon}></img>
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                       ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]   ">
                    {bio}
                  </p>
                </div>
              </div>
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b-[3px] border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b-[3px] border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px] ">
                {tab === "about" && (
                  <DoctorAbout
                    data={data}
                  />
                )}
                {tab === "feedback" && <FeedBack reviews={reviews} totalRating={totalRating}/>}
              </div>
            </div>
            <div>
              <SidePanel  doctorId={data._id} ticketPrice={ticketPrice} timeSlots={timeSlots}/>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
