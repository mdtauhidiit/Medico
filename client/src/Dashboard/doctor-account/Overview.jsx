import React from "react";
import { FaStar } from "react-icons/fa";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Capitalize from "../../utils/capitalizeString";

const Overview = ({ data }) => {

  
  return (
    <div className="">
      <div className="flex items-center gap-4 mb-10 py-2">
        <figure className="max-w-[200px] max-h-[200px] mt-[-35px]">
          <img src={data?.photo} className="w-full" />
        </figure>
        <div>
          <span className=" text-irisBlueColor  px-1 rounded-md text-[12px] leading-2 lg:text-[16px] lg:leading-6 font-semibold">
            {data.specialization && Capitalize(data?.specialization)}
          </span>
          <h3 className="text-[22px] leading-9 font-bold gradient__text ">
            {data.name}
          </h3>
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-5 font-serif">
              <FaStar size={15} color="#FF9529" /> {`   ${data.averageRating}`}
            </span>
            <span className=" text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-serif">{`   (${data.totalRating})`}</span>
          </div>

          <p className="text__para text-gray-300 font-[15px] lg:max-w-[390px] leading-6">
            {data?.bio}
          </p>
        </div>
      </div>
      <DoctorAbout data={data}/>
    </div>
  );
};

export default Overview;
