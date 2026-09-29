import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { images } from "../data";
import { Link } from "react-router-dom";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaXTwitter } from "react-icons/fa6";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

//const images = ["/sansirong/s1.jpg", "/sansirong/s2.jpg", "/sansirong/s3.jpg"];

const HomeHero = ({ t }) => {
  // const videoSrc = "/h.mp4";

  const videoSrc =
    "https://www.pegatroncorp.com/media/20250115032815108_MainBN_Maker_XL_mb.mp4";
  const video1 =
    "https://www.pegatroncorp.com/media/20250115032849629_MainBN_AI_mb.mp4";
  const video2 =
    "https://www.pegatroncorp.com/media/20250115032749773_MainBN_Server_mb.mp4";
  const video3 =
    "https://www.pegatroncorp.com/media/20250115032815108_MainBN_Maker_XL_mb.mp4";

  const g1 =
    "https://www.pegatroncorp.com/media/20241219033242374_Automotive_hover.mp4";
  const g2 =
    "https://www.pegatroncorp.com/media/20250117102612342_5G_hover.mp4";
  const g3 =
    "https://www.pegatroncorp.com/media/20250117102537583_IOT_hover.mp4";
  const g4 =
    "https://www.pegatroncorp.com/media/20250117102527866_Computing_hover.mp4";
  const g5 =
    "https://www.pegatroncorp.com/media/20241219113526769_news_expand.png";
  const g6 =
    "https://www.pegatroncorp.com/media/20241219033738573_AI_hover.mp4";

  const videos = [video1, video2, video3];

  const [sectionIndex, setSectionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const whatsappNumber = "8610102669";
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=Hi, I would like to know more.`;

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // const handleVideoEnded = () => {
  //   setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  // };

  // const handleDotClick = (index) => {
  //   setCurrentVideoIndex(index);
  // };

  const location = useLocation();

  const partners = [
    {
      img: "/part/1.png",
    },
    {
      img: "/part/2.png",
    },
    {
      img: "/part/3.png",
    },
    {
      img: "/part/4.png",
    },
    {
      img: "/part/5.png",
    },
    {
      img: "/part/6.png",
    },
    {
      img: "/part/7.png",
    },
    {
      img: "/part/8.png",
    },
    {
      img: "/part/9.png",
    },
    {
      img: "/part/10.png",
    },
    {
      img: "/part/11.png",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5, // Desktop default
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // Mobile screen
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const mobSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3, // Desktop default
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // Mobile screen
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-y-auto">
      {/* Section 1 - Normal */}
      <section className=" relative h-screen flex items-center justify-start bg-black">
        {/* <video
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center"
          src={videoSrc}
          autoPlay
          loading="lazy"
          muted
          loop
          playsInline
        /> */}
        <img
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center"
          src="/b3.jpg"
          alt="Banner"
        />

        <div className="relative z-10 flex flex-col  items-center justify-center md:justify-end h-full text-white">
          <h3 className="mt-4 bg-gradient-to-r from-neutral-400 to-rose-700 bg-clip-text text-transparent text-white md:font[800] text-stroke text-stroke-white text-fill-white text-[28px] md:text-5xl  px-6 md:px-0 md:pb-28  font-bold md:w-[1000px] md:text-[65px] leading-[55px] md:leading-[70px] md:pl-28">
            {t("head1")} <br />
            <span className="relative hidden md:block typewriter md:leading-[80px]  font-bold text-6xl text-white">
              {t("head2")}
            </span>
            <span className="relative md:hidden typewriter inline-block font-bold text-[28px] text-white">
              STRIVING FOR EXCELLENCE.
            </span>
          </h3>
        </div>
      </section>

      {/* Section 2 - Blur */}
      <section className=" w-full  relative  flex   pt-10 px-8 md:px-0  bg-black">
        <video
          className="absolute inset-0 w-full h-full mb-5 object-cover object-[60%_center] md:object-center"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 backdrop-blur-lg bg-black/40" />
        <div className="relative z-10 text-white text-4xl">
          <div className="flex mt-20 md:mt-0 md:pb-24 gap-5 relative md:pl-28 rounded-lg flex-col md:flex-row  overflow-hidden md:pt-20 shadow-lg">
            <div className="w-full  md:overflow-hidden pr-3  pl-5 md:pl-10  rounded-lg md:w-vw ">
              <h1 className=" text-[18px] md:text-[30px]  pt-3">
                {t("aboutus")}
              </h1>
              <div className="w-[50px] bg-white  md:mt-1 rounded-full"></div>
              <div className="leading-snug pb-10">
                <h1 className="text-[25px] font-[800] pt-5">
                  {t("abouthead")}
                </h1>
                <h3 className="text-[16px] leading-[25px] tracking-[1px] md:pt-3 md:w-[900px] font-[500] ">
                  {t("aboutpara1")}
                </h3>

                <h3 className="text-[16px]  tracking-[1px] pt-5 leading-[25px] md:pt-3 md:w-[700px] font-[500] md:mb-5 ">
                  {t("aboutpara2")}
                  <Link
                    to="/about"
                    className="text-blue-500 text-[15px] cursor-pointer hover:underline"
                  >
                    Readmore
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Blur */}
      {/* <section className="full-section  relative h-screen flex items-center justify-center bg-black ">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 backdrop-blur-xl animate-bgPulse bg-black" />
        <div className="w-full h-[400px] px-5 md:px-8 md:h-[350px]  mb-14  ">
          <section
            className="relative w-full h-full rotate-2 md:rotate-0 scale-110  bg-white brightness-90 py-16 rounded-tl-[180px] rounded-tr-[20px] rounded-br-[280px] "
            style={{
              backgroundImage: "url('/world.jpg')", // Replace with your image path
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "brightness(90%)",
            }}>
           
            <div className="text-center">
              <p className="text-blue-500 uppercase tracking-wide text-sm font-semibold">
                Worldwide Experience
              </p>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center max-w-3xl mx-auto">
              <div>
                <p className="text-blue-500 text-4xl font-bold">250+</p>
                <p className="text-gray-700 text-sm mt-1">OSS</p>
              </div>
              <div>
                <p className="text-blue-500 text-4xl font-bold">10+</p>
                <p className="text-gray-700 text-sm mt-1">Trading</p>
              </div>
              <div>
                <p className="text-blue-500 text-4xl font-bold">20+</p>
                <p className="text-gray-700 text-sm mt-1">Languages</p>
              </div>
            </div>
          </section>
        </div>
      </section> */}

      {/* Section mobile -- 4 and Desktop --hidden - Blur */}

      <section className=" md:hidden  relative h-[100%] flex items-center justify-center bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 backdrop-blur-lg md:pb-20 hidden md:block bg-black/40" />
        <div className="relative z-10 text-white text-4xl ">
          <div className=" md:hidden py-3">
            <div className="gap-5 relative rounded-lg grid grid-cols-1 overflow-hidden  shadow-lg">
              {images.map((item, i) => (
                <div
                  key={i}
                  className="relative  rounded-lg  overflow-hidden  cursor-pointer group"
                >
                  <img
                    src={item.src}
                    alt={`Image ${i + 1}`}
                    onClick={() => navigate("/oss")}
                    className="w-[400px] h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section mobile -- 6 and Desktop --5 - Blur */}

      <div className="relative overflow-x-hidden">
        <section className="  relative h-screen md:flex md:items-center md:flex-col md:justify-start bg-black">
          <video
            className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-center"
            src={videoSrc}
            autoPlay
            loading="lazy"
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 backdrop-blur-lg md:pb-20  md:block bg-black/40" />
          <div className=" z-10 h-full hidden pb-20 md:block text-white">
            <div className="flex flex-col pt-28   md:pl-14 md:flex-row md:pr-14 gap-5">
              {images.map((item, i) => (
                <div
                  key={i}
                  className=" rounded-lg  cursor-pointer group"
                  //onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.src}
                    alt={`Image ${i + 1}`}
                    onClick={() => navigate("/oss")}
                    className="w-full f-full md:h-[200px] rounded-lg hover:brightness-50 md:transition-all md:duration-500 md:w-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <footer className="absolute z-[50] inset-0 mt-10 md:pt-20 md:top-1/3 w-[100vw] md:px-10   left-0  text-white">
              <div className="container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-800 pb-6">
                  {/* Logo & Socials */}
                  <div className="pl-2 md:pl-0">
                    <img src="/logo1.png" alt="Logo" className="w-14 mb-3" />
                    <div className="border-b-2 border-pink-400 w-14 mb-3"></div>
                    <div className="flex space-x-3">
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
                  <div className="pl-2 md:pl-0">
                    <h3 className="font-semibold mb-2">{t("footerabout")}</h3>
                    <div className="border-b-2 border-pink-400 w-14 mb-3"></div>
                    <ul className="space-y-1 pl-4 md:pl-0 text-sm">
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
                        <Link to="/launguage" className="hover:text-pink-400">
                          {t("footerabout3")}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="font-semibold mb-2">{t("contactus")}</h3>
                    <div className="border-b-2 border-pink-400 w-14 mb-3"></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <FiPhone className="text-pink-400" /> +91 8610102669
                      </li>
                      <li className="flex items-center gap-2">
                        <FiMail className="text-pink-400" />{" "}
                        sansirongsales@gmail.com
                      </li>
                      <li className="flex items-start gap-2">
                        <FiMapPin className="text-pink-400 mt-1" size={40} />
                        4, Maple Building, Thiriveni nagar, Opposite to
                        Saraswathi Statue Vadakkupattu village Oragadam
                        Industrial Area, Kancheepuram, Tamil Nadu 603204
                      </li>
                      <li className="flex items-start gap-2">
                        <FiMapPin size={14} className="text-pink-400 mt-1" />
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
                <div className="text-center text-xs cursor-pointer  text-white mt-3">
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
            </footer>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
          >
            <FaWhatsapp size={28} />
          </a>
        </section>
      </div>
    </div>
  );
};

export default HomeHero;
