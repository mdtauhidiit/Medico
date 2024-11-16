import React from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/useFetchData";
import DoctorCard from "../../components/Doctor/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import BookingTable from "./BookingTable";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  console.log(appointments);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && <Error errMessage={error} />}
      {!error && !loading && <BookingTable appointments={appointments}/>}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have no appointments in the queue
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
