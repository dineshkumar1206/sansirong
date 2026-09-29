import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import Launguage from "../Launguage";
import Language from "../Launguage";

function AboutNavbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navitems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT", to: "/about" },
    { title: "SERVICES" },
    // { title: "ONSITE SUPPORT SERVICES(OSS)", to: "/oss" },
    // { title: "TRADING", to: "/trading" },

    // { title: "LAUNGUAGE INTERPRETATION", to: "/launguage" },
    { title: "CONTACT", to: "/contact" },
    { title: "CAREERS", to: "/careers" },
  ];

  const mobNavitems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT", to: "/about" },

    { title: "ONSITE SUPPORT SERVICES(OSS)", to: "/oss" },
    { title: "TRADING", to: "/trading" },

    { title: "LANGUAGE INTERPRETATION", to: "/language" },
    { title: "CONTACT", to: "/contact" },
    { title: "CAREERS", to: "/careers" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`top-0 left-0 md:pt-1 w-full flex justify-between items-center px-8  pb-4 z-50 transition-all duration-300
        md:backdrop-blur-lgv fixed md:relative backdrop-blur-sm md:bg-white/5 shadow-md font-bold  text-[#f30d0d] 
         
      `}
    >
      {/* Logo */}
      {/* <Link to="/" className="text-4xl font-sans tracking-[2px] font-bold">
        <img src="/logo.png" className="h-20 md:h-20" />
      </Link> */}
      <div className="md:px-1 flex items-center">
        <Link
          to="/"
          className="text-4xl text-neutral-300 md:text-white  font-sans tracking-[2px] font-bold"
        >
          <img
            src="/logo1.png"
            className="h-20 md:w-full mr-2 md:mr-0 md:h-20 "
          />
        </Link>
        <h1 className="pl-1  leading-[20px] md:px-2">
          <span className="text-white  tracking-[2px] text-4xl font-[600] md:text-[40px]">
            SANSIRONG
          </span>
          <br />
          <span className="text-white  text-[13px] font-[800] leading-[18px] md:text-[14px]">
            {" "}
            INTERNATIONAL PRIVATE LIMITED
          </span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden required: md:flex justify-end  md:pr-14 md:gap-10  md:text-[15px]">
        <div className="absolute top-6 left-[480px] ">
          <Language />
        </div>
        {navitems.map((page, index) => (
          <div key={page.title} className="relative">
            {page.title === "SERVICES" ? (
              <div
                className="flex justify-center items-center gap-3 text-white cursor-pointer"
                onMouseEnter={() => setIsServicesOpen(!isServicesOpen)}
                onMouseLeave={() => setIsServicesOpen(!isServicesOpen)}
              >
                <span className="text-[15px]">{page.title}</span>
                {/* icon toggle */}
                {isServicesOpen ? (
                  <FaChevronUp className="transition-all duration-300" />
                ) : (
                  <FaChevronDown className="transition-all duration-300" />
                )}

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 mt-2 w-80 p-5 space-y-5 backdrop-blur-lg top-5 bg-black/50  rounded-lg shadow-lg flex flex-col z-50  "
                    >
                      <Link
                        to="/oss"
                        onClick={closeMenu}
                        className="text-[15px] transition-all py-2 duration-300 ease-in-out hover:text-black px-2 rounded hover:bg-white"
                      >
                        ONSITE SUPPORT SERVICES (OSS)
                      </Link>
                      <Link
                        to="/trading"
                        onClick={closeMenu}
                        className="text-[15px] transition-all py-2 duration-300 ease-in-out px-2 rounded hover:text-black hover:bg-white"
                      >
                        TRADING
                      </Link>
                      <Link
                        to="/language"
                        onClick={closeMenu}
                        className="text-[15px] transition-all py-2 duration-300 ease-in-out px-2 rounded hover:text-black hover:bg-white"
                      >
                        LANGUAGE INTERPRETATION
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div key={page.title} className="">
                <Link
                  to={page.to}
                  style={{
                    transition: "all 0.2s ease-in-out",
                  }}
                  className="text-white hover:text-neutral-100 hover:shadow[0_0_10px_#fa160e]"
                  onClick={closeMenu}
                  onMouseLeave={(e) => (e.target.style.textShadow = "none")}
                  onMouseEnter={(e) =>
                    (e.target.style.textShadow =
                      "0 0 10px #fa160e, 0 0 20px #fa160e")
                  }
                >
                  {page.title}
                </Link>
                {location.pathname === page.to && (
                  <div className="w-full h-[2px]  bg-[#ff746f]   transition-all duration-300 ease-in-out rounded-full"></div>
                )}
                {page.title === "SERVICES"}
              </div>
            )}
          </div>
        ))}

        {/* <div>
          <Launguage />
        </div> */}
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative text-2xl cursor-pointer"
      >
        {isOpen ? <FaTimes /> : <FaBars className="text-red-700" />}
      </button>
      <div className="md:hidden top-36 -left-10 absolute ">
        <Language />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0  h-screen left-0 w-full bg-black/90 flex flex-col items-center justify-center gap-8 text-lg transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleMenu} className="flex justify-end">
          <FaTimes className="text-white" />
        </button>
        {mobNavitems.map((page) => (
          <div key={page.title} className="flex flex-col items-center">
            <Link
              to={page.to}
              className="text-white text-[15px]"
              onClick={closeMenu}
            >
              {page.title}
            </Link>
            {location.pathname === page.to && (
              <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default AboutNavbar;
