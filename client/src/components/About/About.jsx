import React from "react";
import aboutImg from "../../assets/images/about.jpg";
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <section>
      <div className="container mb-16">
        <div className="flex items-start justify-center flex-col md:flex-row gap-[50px] ">
          {/* About image */}
          <div className="w-full order-2 md:order-1 mx-auto">
            <img src={aboutImg} alt=""  className="max-h-[500px]  rounded-lg w-full "/>
            
          </div>
          {/* About Content */}
          <div className="w-full order-1 md:order-2 px-3">
            <h2 className="gradient__text text-[44px] leading-[48px]">Proud to be one of the nations best</h2>
            <p className="text__para text-gray-400">
                For 30 years in a row, U.S. News & World Report has recognised us one of the best publics hospitals in the Nation. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ad quos aliquid quo natus facilis adipisci, eos tempore obcaecati numquam.
            </p>
            <p className="text__para mt-[30px] text-gray-400">
                Our best is something we strive for everyday, caring for our patients-not looking back at what we accomplished but towards what we can do tomorrow. Provinding the best. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id deserunt aspernatur, dolorum modi perferendis neque.
            </p>
            <Link to="/"><button className="btn bg-slate-950 border-2 border-purple-200">Learn more</button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
