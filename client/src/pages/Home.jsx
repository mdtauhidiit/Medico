import React, { useState } from "react";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import Service from "./Service";
import ServiceList from "../components/Services/ServiceList";
import featureImg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import DoctorList from "../components/Doctor/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {

  const [hovered1,setHovered1]=useState(false);
  const [hovered2,setHovered2]=useState(false);
  const [hovered3,setHovered3]=useState(false);
  return (
    <>
      {/*========= Hero Section =============*/}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container mt-12">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify between">
            {/*========= Hero Content =============*/}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] font-[800] md:text-[60px] md:leading-[70px] bg-gradient-to-tl from-white via-slate-400 to-purple-700 bg-clip-text text-transparent">
                  We help patients live a healthy, longer life
                </h1>
                <p className="text__para text-gray-400">
                  At Medico, we provide comprehensive,
                  compassionate, and accessible healthcare to each individual in our community. We are dedicated to delivering
                  high-quality medical services in a patient-centered
                  environment, ensuring that every patient receives the care and
                  attention they deserve. We offer a wide range of
                  healthcare services, including primary care, preventive
                  screenings, chronic disease management, women’s health,
                  pediatrics, mental health counseling, and urgent care.
                </p>
                <button className="btn bg-slate-950 border-2 border-solid border-purple-200">
                  Request an Approintment
                </button>
              </div>

              {/*======== hero counter ========*/}
              <div className="mt-[30px] lg:mt[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text-para text-slate-300">
                    Years of Experience
                  </p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text-para text-slate-300">Clinic Locations</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text-para text-slate-300">
                    Patient Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/*========= Hero Content =============*/}
            <div className="flex justify-end gap-[30px]">
              <div>
                <img className="w-full" src={heroImg01} alt="heroImg"></img>
              </div>
              <div className="mt-[30px]">
                <img
                  className="w-full mb-[30px]"
                  src={heroImg02}
                  alt="heroImg"
                ></img>
                <img className="w-full mb" src={heroImg03} alt="heroImg"></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*========= Hero Section END =============*/}
      <section>
        <div className="container">
          <div className="mx-auto lg:w-[470px]">
            <h2 className="text-[44px] leading-[48px] gradient__text font-[700] text-center">
              Providing the best Medical Services
            </h2>
            <p className="text__para text-center text-gray-400">
              World Class care for everyone. Our health System offers
              unmatched,expert health care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div onMouseOver={()=>setHovered1(true)} onMouseLeave={()=>setHovered1(false)} className={`py-[30px] px-5 ${hovered1? 'hover:glassmorphism':'gradient__background'} `}>
              <div className="flex items-center justify-center">
                <img className="" src={icon01} alt=""></img>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leadin font-[700] text-center gradient__text">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-gray-400 font-[400] text-center">
                  World Class care for everyone. Our health System offers
                  unmatched,expert health care
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-purple-200 mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="text-purple-200 group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div onMouseOver={()=>setHovered2(true)} onMouseLeave={()=>setHovered2(false)} className={`py-[30px] px-5 ${hovered2? 'hover:glassmorphism':'gradient__background'} `}>
              <div className="flex items-center justify-center">
                <img className="" src={icon02} alt=""></img>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 gradient__text font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-gray-400 font-[400] text-center">
                  World Class care for everyone. Our health System offers
                  unmatched,expert health care
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-purple-200 mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="text-purple-200 group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div onMouseOver={()=>setHovered3(true)} onMouseLeave={()=>setHovered3(false)} className={`py-[30px] px-5 ${hovered3? 'hover:glassmorphism':'gradient__background'} `}>
              <div className="flex items-center justify-center">
                <img className="" src={icon03} alt=""></img>
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 gradient__text font-[700] text-center">
                  Schedule an Appoointment
                </h2>
                <p className="text-[16px] leading-7 text-gray-400 font-[400] text-center">
                  World Class care for everyone. Our health System offers
                  unmatched,expert health care
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-purple-200 mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="text-purple-200 group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*========= About Section Start =============*/}
      <About />

      {/* Services Start*/}
      <div className="container mb-12">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="text-[44px] leading-[48px] gradient__text font-[700] text-center">
            {" "}
            Our Medical Services
          </h2>
          <p className="text__para text-center text-gray-400">
            World class care for everyone, Our health System Offers unmatched,
            expert health care
          </p>
        </div>
        <ServiceList />
      </div>
      {/* Services end*/}

      {/* Feature Section start */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* feature Content  */}
            <div className="xl:w-[670px]">
              <h2 className="text-[44px] leading-[48px] gradient__text font-[700]">
                {" "}
                Get Virtual Treatment
                <br />
                anytime
              </h2>
              <ul className="pl-4 list-disc">
                <li className="text__para text-gray-400 ">
                  Schedule the appointment directly
                </li>
                <li className="text__para text-gray-400">
                  Search for your physician here, and contact their office
                </li>
                <li className="text__para text-gray-400">
                  View our physicians who are accepting new patients, use the
                  online scheduling tool to select an appointment time
                </li>
              </ul>
              <Link to="/doctors">
                <button className="btn bg-slate-950 border-2 border-purple-200">
                  Learn More
                </button>
              </Link>
            </div>
            {/* feature imge  */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-full lg:w-3/4" alt=""></img>
              {/* <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00 AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-normal bg-yellowColor rounded py-2 px-[6px] lg:py-3 lg:px-[9px] ">
                    <img src={videoIcon} alt=""></img>
                  </span>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] text-irisBlueColor lg:text-[12px] lg:leading-4 font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* Feature Section end */}

      {/* our great doctors  */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-center gradient__text text-[44px] leading-[48px] font-[700]">
              {" "}
              Our Great Doctors
            </h2>
            <p className="text__para text-center text-gray-200">
              World class care for everyone, Our health System Offers unmatched,
              expert health care
            </p>
          </div>
          <DoctorList />
        </div>
      </section>
      {/* ========our great doctors end==========*/}
      {/* faq section  */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} />
            </div>
            <div className="w-full md:w-1/2 mt-6 ">
              <h2 className="heading gradient__text text-[54px] leading-[54px]">
                Most Questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* faq section  */}

      {/* testimonial */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-center gradient__text text-[44px] leading-[48px] font-[700]">
              {" "}
              What our patient says
            </h2>
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

export default Home;
