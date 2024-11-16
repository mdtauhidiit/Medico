import React from "react";
import formateDate from "../../utils/formateDate";

const DoctorAbout = ({data}) => {
  
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="gradient__text font-[900] text-[24px] leading-9">
            {data?.name}
          </span>
        </h3>
        <p className="text__para">{data?.about} </p>
      </div>

      <div className="mt-10">
        <h3 className="text-[20px] leading-[30px] text-primaryColor font-semibold ">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {data?.qualifications?.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[10px] "
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                  </span>
                  <p className="text-[16px] text-textColor leading-6 font-medium">
                    {item.degree}
                  </p>
                </div>
                <p className="text-[14px] text-textColor leading-5 font-medium py-5">
                  {item.university}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="">
        <h3 className="text-[20px] leading-[30px] text-primaryColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {data?.experiences?.map((item, index) => {
            return (
              <li key={index} className="p-4 rounded bg-[#8678f9]">
                <span className="text- text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
                <p className="text-[16px] text-textColor leading-6 font-medium">
                  {item.position}
                </p>
                <p className="text-[14px] text-textColor leading-5 font-medium">
                  {item.hospital}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
