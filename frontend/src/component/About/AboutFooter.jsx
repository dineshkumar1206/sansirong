import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaArrowUp,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const AboutFooter = () => {
  const { t } = useTranslation();
  const whatsappNumber = "8610102669";
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hi, I would like to know more.`;

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    console.log("About Footer");
    const handleScroll = () => {
      console.log("Scroll Y position:", window.scrollY);
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const videoSrc =
    "https://www.pegatroncorp.com/media/20250115032815108_MainBN_Maker_XL_mb.mp4";

  return (
    <footer className="relative text-white  md:pb-0 pt-10 overflow-hidden">
      {/* 🔹 Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50   backdrop-blur-sm z-[-1] "></div>{" "}
      {/* 🔹 dark overlay for readability */}
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-800 pb-8">
          {/* Logo & Socials */}
          <div>
            <img src="/logo1.png" alt="Logo" className="w-16 mb-4" />
            <div className="border-b-2 border-pink-400 w-16 mb-4"></div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579618665773"
                className="hover:text-pink-400"
                target="_blank"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://x.com/sansirongs/communities/explore"
                className="hover:text-pink-400"
                target="_blank"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="https://www.instagram.com/__sansirong/"
                className="hover:text-pink-400"
                target="_blank"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.pinterest.com/sansirongsales/"
                className="hover:text-pink-400"
                target="_blank"
              >
                <FaPinterestP size={16} />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-2">{t("footerabout")}</h3>
            <div className="border-b-2 border-pink-400 w-16 mb-4"></div>
            <ul className="space-y-2 pl-4 md:pl-0 text-sm">
              <li>
                <Link to="/about" className="hover:text-pink-400">
                  {t("footerabout1")}
                </Link>
              </li>
              <li>
                <Link to="/oss" className="hover:text-pink-400">
                  {t("footerabout2")}
                </Link>
              </li>
              <li>
                <Link to="/language" className="hover:text-pink-400">
                  {t("footerabout3")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">{t("contactus")}</h3>
            <div className="border-b-2 border-pink-400 w-16 mb-4"></div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="text-pink-400" />
                <a
                  href="tel:+918610102669"
                  className="flex items-center gap-2 hover:text-pink-300 transition"
                >
                  +91 8610102669
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-pink-400" />{" "}
                <a
                  href="mailto:sansirongsales@gmail.com"
                  className="flex items-center gap-2 hover:text-pink-300 transition"
                >
                  sansirongsales@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin size={40} className="text-pink-400 mt-1" /> 4, Maple
                Building, Thiriveni nagar, Opposite to Saraswathi Statue
                Vadakkupattu village Oragadam Industrial Area, Kancheepuram,
                Tamil Nadu 603204
              </li>

              <li className="flex items-start gap-2">
                <FiMapPin size={15} className="text-pink-400 mt-1" />
                65 Sims Ave
                <br />
                #04-11
                <br />
                Yi Xiu Factory Building
                <br />
                Singapore 387418
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pb-10 text-xs md:pb-5 text-white mt-4">
          © 2025 Created with{" "}
          <a
            href="https://amigowebster.com"
            target="_blank"
            className="text-white px-2 text-[13px] font-bold hover:underline"
          >
            amigowebster
          </a>
        </div>
      </div>
      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 z-[9999]"
        >
          <FaArrowUp size={20} />
        </button>
      )}
      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping-slow"></span>
        <FaWhatsapp size={28} className="relative z-10" />
      </a>
    </footer>
  );
};

export default AboutFooter;
