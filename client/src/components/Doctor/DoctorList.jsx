import React from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";
import useFetchData from "../../Hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../Loader/Loading";
import Error from "../Error/Error";

const DoctorList = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  const doctors=data
//   if(loading && !error) return <Loading />
//   if(!loading && error) return <Error />
//   return <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
//   {doctors.map((doctor, index) => {
//     return <DoctorCard key={index} doctor={doctor} />;
//   })}
// </div>
  return (
    <div>
      {loading && !error && <Loading />}
      {!loading && error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor, index) => {
            return <DoctorCard key={index} doctor={doctor} />;
          })}
        </div>
      )}
      </div>
  );
};

export default DoctorList;
