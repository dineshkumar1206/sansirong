import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Language from "./Launguage";

function Navbar({ aboutScroll, t }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/about") {
      if (aboutScroll > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    } else {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 5);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname, aboutScroll]);

  return (
    <nav
      className={`fixed top-0 text-white font-[500] left-0 w-full flex justify-between items-center px-8 md:px-5  md:pt-2  md:pl-18 pb-4 z-[9999] ${
        location.pathname === "/about" && isScrolled
          ? "backdrop-blur-md bg-black/50"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="md:px-2 flex items-center">
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
      <div className="hidden md:block">
        <Language />
      </div>

      {/* Desktop Menu */}
      <div className="hidden relative text-white drop-shadow-lg font-bold md:flex gap-8 md:gap-10 md:pr-14  ">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-[15px] transition-all duration-300 ease-in-out hover:text-white"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          HOME
          {/* {t("home")} */}
          {location.pathname === "/" && (
            <div className="h-[2px] bg-[#fa160e] w-full rounded-full"></div>
          )}
        </Link>
        <Link
          to="/about"
          onClick={closeMenu}
          className="text-[15px] transition-all duration-300 ease-in-out hover:text-white"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          ABOUT
          {/* {t("about")} */}
          {location.pathname === "/about" && (
            <div className="w-[50px] h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link
          to="/oss"
          onClick={closeMenu}
          className="text-[15px] relative flex justify-center items-center md:gap-1 lg:gap-3 transition-all duration-300 ease-in-out hover:text-white"
          onMouseEnter={(e) => {
            setIsServicesOpen(!isServicesOpen);
          }}
          onMouseLeave={(e) => {
            e.target.style.textShadow = "none";
            setIsServicesOpen(!isServicesOpen);
          }}
        >
          <span>SERVICES</span>

          {/* <span>{t("services")}</span> */}
          {isServicesOpen ? (
            <FaChevronUp className="transition-all duration-300 text-white" />
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
        </Link>

        <Link
          to="/contact"
          onClick={closeMenu}
          className="text-[15px] transition-all duration-300 ease-in-out hover:text-white"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          CONTACT
          {/* {t("contact")} */}
        </Link>
        <Link
          to="/careers"
          onClick={closeMenu}
          className="text-[15px] transition-all duration-300 ease-in-out hover:text-white"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          CAREERS
          {/* {t("careers")} */}
        </Link>
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="text-[15px] transition-all duration-300 ease-in-out hover:text-white"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          DASHBOARD
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl relative text-white cursor-pointer"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="md:hidden top-36 -left-10 absolute ">
        <Language />
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/90 flex flex-col items-center justify-center gap-8 text-lg transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleMenu} className="flex justify-end">
          <FaTimes />
        </button>
        <Link to="/" onClick={closeMenu} className={` text-[15px] `}>
          HOME
          {/* {t("home")} */}
          {location.pathname === "/" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link to="/about" onClick={closeMenu} className={` text-[15px] `}>
          ABOUT
          {/* {t("about")} */}
          {location.pathname === "/about" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link to="/oss" onClick={closeMenu} className={` text-[15px] `}>
          ONSITE SUPPORT SERVICES(OSS)
          {location.pathname === "/oss" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>

        <Link to="/trading" onClick={closeMenu} className={` text-[15px]`}>
          TRADING
          {location.pathname === "/trading" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link to="/language" onClick={closeMenu} className={` text-[15px]`}>
          LANGUAGE INTERPRETATION
          {location.pathname === "/launguage" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link to="/contact" onClick={closeMenu} className={` text-[15px]`}>
          CONTACT
          {/* {t("contact")} */}
          {location.pathname === "/contact" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link
          //to="/careers"
          onClick={closeMenu}
          className={` text-[15px]`}
        >
          CAREERS
          {/* {t("careers")} */}
          {location.pathname === "/contact" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
        <Link to="/dashboard" onClick={closeMenu} className={` text-[15px]`}>
          DASHBOARD
          {location.pathname === "/dashboard" && (
            <div className="w-full h-[2px] bg-[#fa160e] rounded-full"></div>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
