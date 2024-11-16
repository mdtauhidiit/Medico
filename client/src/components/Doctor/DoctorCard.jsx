import React from "react";
import startIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Capitalize from "../../utils/capitalizeString";

const DoctorCard = ({ doctor }) => {
  const {
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = doctor;
  
  return (
    <div className="p-3 lg:p-5 gradient__background">
      <div className="">
      
          <img src={photo} className="w-full h-[180px] lg:h-[320px]" />
        
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 gradient__text font-[700] mt-3 lg:mt-5">
        {name}
      </h2>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-slate-800 text-purple-400 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization && Capitalize(specialization)}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] font-semibold text-headingColor">
            <img src={startIcon} />
            {averageRating}
          </span>
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div className="">
          {/* <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>+{totalPatients} patients</h3> */}
          <p className="text-[14px] leading-6 text-gray-400 font-[400]">
            At {experiences && experiences[0]?.hospital}
          </p>
        </div>
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-purple-200 flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="text-purple-200 group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
