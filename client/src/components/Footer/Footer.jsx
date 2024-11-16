import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-slate-950 footer flex flex-col items-center justify-center border-t-2  border-neutral-950">
      <div className="flex flex-col">
        <div className="h-[80px] mb-4 text-center p-6" ><h2 className="logo__text text-5xl">MEDICO</h2></div>
        <p className="text-[16px] text-white font-[400] mb-[20px] pb-2">
          Copyright @2024 developed by Md Tauhid
        </p>
      </div>
      <div className="flex items-start justify-between w-[40%] pb-5 px-2 lg:px-6">
        <AiFillGithub className="w-10 h-10 text-white cursor-pointer" />
        <AiOutlineInstagram className="w-10 h-10  text-white hover:text-[#E4405F] cursor-pointer" />
        <RiLinkedinFill className="w-10 h-10  text-white hover:text-[#0077B5] cursor-pointer" />
        <AiFillYoutube className="w-10 h-10  text-white hover:text-red-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
