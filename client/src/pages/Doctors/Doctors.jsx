import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctor/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from '../../components/Error/Error'

const Doctors = () => {
  const [query,setQuery] =useState('');
  const [debounceQuery,setDebounnceQuery]=useState('')

  const handleSearch = () =>{
    setQuery(query.trim())
  }

  useEffect(()=>{

    const timeout = setTimeout(()=>{
      setDebounnceQuery(query)
    },700)

    return ()=>clearTimeout(timeout)

  },[query])

  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors/`);
  

  return (
    <>
      <section className="mb-[-80px]">
        <div className="container text-center">
          <h2 className="text-[44px] leading-[48px] font-[700]  gradient__text"> Find a Doctor</h2>
          <div className="border-2 border-[#c7d2fe] max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              type="search"
              className="py-3 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-gray-400 text-white"
              placeholder="Search doctor by name or specifications"
            />
            <button onClick={handleSearch} className="btn mt-0 rounded-[0px] rounded-r-md bg-slate-950">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && !error && <Loading />}
          {!loading && error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* testimonial */}
      <section>
        <div className="container mt-[-50px]">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-[44px] leading-[48px] font-[700] gradient__text text-center"> What our patient says</h2>
            <p className="text__para text-center text-gray-400">
              World class care for everyone, Our health System Offers unmatched,
              expert health care
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
      {/* testimonial */}
    </>
  );
};

export default Doctors;
