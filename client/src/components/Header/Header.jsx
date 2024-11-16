import React, { useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/authContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/Doctors",
    display: "Find a Doctor",
  },
  {
    path: "/Services",
    display: "Services",
  },
  {
    path: "/Contact",
    display: "Contact",
  },
];

const Header = () => {
  
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center border-b-2 border-neutral-950 bg-slate-950 fixed">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ========= Logo ========= */}
          <div>
            <h2 className="logo__text">MEDICO</h2>
          </div>

          {/* ========= Menu ========= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-white text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ===== nav Right ========= */}

          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="">
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                  className="flex items-center justify-center gap-2"
                >
                  <h2 className="font-[600] text-white hover:text-primaryColor">
                    {user?.name}
                  </h2>
                  <div className="w-[35px] h-[35px] rounded-full cursor-pointer border-2 border-solid border-white hover:border-primaryColor">
                    <img
                      src={user?.photo}
                      alt=""
                      className="w-full rounded-full h-full"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-white py-2 px-6 border-2 border-puple-500  text-black font-[600] h-[40px] flex items-center justify-center rounded-[30px] hover:bg-slate-950 hover:text-white ">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-8 h-12 cursor-pointer text-white" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
