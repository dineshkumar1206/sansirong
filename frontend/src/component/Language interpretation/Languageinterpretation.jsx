import React, { useState } from "react";
import AboutNavbar from "../About/AboutNavbar";
import AboutFooter from "../About/AboutFooter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

const colors = [
  { bg: "bg-indigo-100", text: "text-black", border: "border-indigo-400" },
  { bg: "bg-green-100", text: "text-black", border: "border-green-400" },
  { bg: "bg-blue-100", text: "text-black", border: "border-blue-400" },
  {
    bg: "bg-yellow-100",
    text: "text-black",
    border: "border-yellow-400",
  },
  {
    bg: "bg-purple-100",
    text: "text-black",
    border: "border-purple-400",
  },
  { bg: "bg-orange-100", text: "text-black", border: "border-orange-400" },
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const OnsiteService = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const serve = [t("l16"), t("l17"), t("l18"), t("l19"), t("l20"), t("l21")];

  const partners = [
    {
      img: "/part/new/p1.png",
    },
    {
      img: "/part/new/p2.png",
    },
    {
      img: "/part/new/p3.png",
    },
    {
      img: "/part/new/p4.png",
    },
    {
      img: "/part/new/p5.png",
    },
    {
      img: "/part/new/p6.png",
    },
    {
      img: "/part/new/p7.png",
    },
    {
      img: "/part/new/p8.png",
    },
    {
      img: "/part/new/p9.png",
    },
    {
      img: "/part/new/p10.png",
    },
    {
      img: "/part/new/p11.png",
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
    <div className=" h-screen overflow-y-scroll">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-20">
          <AboutNavbar />
        </div>
        <div
          className="bg-cover  top-14 bg-center brightness-50 bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://media.istockphoto.com/id/1032296056/photo/young-woman-and-man-in-headphones-learning-different-languages-communicating.jpg?s=612x612&w=0&k=20&c=-lgeXoB7t8Uwp5gIRkZxhcgIezrYu3wIosP2_sWBIew=")',
            height: "500px",
          }}
        >
          {/* Buttons */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold md:pt-32 text-white text-center">
            {t("language")}
          </h1>
        </div>
      </div>

      {/* <h1 className="hidden md:block md:text-4xl font-bold px-5 pt-20">
        Language Interpretation :
      </h1> */}

      {/* section--1 */}

      <div className="bg-white  py-10 md:pt-20 px-4 md:pl-32 md:pr-24">
        <div className="">
          {/* LEFT SECTION */}
          {/* <div className="">
            <img
              src="./launguage/l1.jpg"
              alt="Factory"
              className="w-full md:w-[500px]  md:h-[650px] rounded-md shadow"
            />
          </div> */}

          {/* RIGHT SECTION */}
          <div className="">
            {/* <p className="text-sm uppercase text-gray-500 font-semibold">
              Language Interpretation Services
            </p> */}
            <div className="text-[22px] md:text-2xl font-bold">
              <Typewriter
                options={{
                  strings: [t("l2")],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="text-gray-700 mt-2 leading-relaxed">{t("l3")}</p>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("l4")}
            </h3>

            <p className="text-gray-700 mt-2 leading-relaxed">{t("l5")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("l6")}</p>
            <p className="mt-2 leading-relaxed">{t("l7")}</p>
            <p className=" mt-2 leading-relaxed">{t("l8")}</p>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("l9")}
            </h3>

            <ul className="mt-2 leading-relaxed text-[18px] custom-list space-y-3">
              <li>{t("l10")}</li>
              <li>{t("l11")}</li>
              <li>{t("l12")}</li>
              <li>{t("l13")}</li>
              <li>{t("l14")}</li>
            </ul>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("l15")}
            </h3>

            <div className="md:max-w-4xl md:my-20 my-10 gap-5  mx-auto grid grid-cols-2 md:grid-cols-3">
              {serve.map((s, i) => {
                const color = getRandomColor();
                return (
                  <span
                    className={` md:px-2 inline-block text-center rounded  py-2 md:py-3 text-[13px] md:text-[18px] bg-opacity-40 font-semibold ${color.bg} ${color.text} ${color.border}`}
                    key={i}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 hidden md:block mt-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#29295e] mb-10">
            {t("partners")}
          </h2>
          <Slider {...settings}>
            {partners.map((member, index) => (
              <div key={index} className="px-4">
                <div className=" overflow-hidden  transition duration-300">
                  <img src={member.img} className="h-[150px] object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="py-12 md:hidden overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-10">
            {t("partners")}
          </h2>
          <Slider {...mobSettings}>
            {partners.map((member, index) => (
              <div key={index} className="px-4">
                <div className=" overflow-hidden  transition duration-300">
                  <img src={member.img} className="h-[100px]  object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Footer */}
      <AboutFooter />
    </div>
  );
};

export default OnsiteService;
