import React, { useState } from "react";
import AboutNavbar from "../About/AboutNavbar";
import AboutFooter from "../About/AboutFooter";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Gina Maldonado",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet cursus volutpat. Aliquam sit amet ligula et justo tincidunt laoreet non vitae lorem. Aliquam porttitor tellus enim, eget commodo augue porta ut. Maecenas lobortis ligula vel tellus sagittis ullamcorper vestibulum pellentesque cursutu.",
    rating: 4.5,
  },
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Another testimonial example text here with the same layout and style.",
    rating: 5,
  },
];

const teamMembers = [
  {
    name: "Jade Bennett",
    role: "Founder",
    img: "/about/m.jpg",
  },
  {
    name: "Luther Owen",
    role: "Psychologist",
    img: "/about/k.jpg",
  },
  {
    name: "Willie Barnes",
    role: "Business Manager",
    img: "/about/l.jpg",
  },
  {
    name: "Emilie Lindsay",
    role: "Advertiser",
    img: "/about/j.jpg",
  },
];

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

const Trading = () => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // const serve = [
  //   "Automotive & Aerospace",
  //   "Electronics & Manufacturing",
  //   "Consumer Goods & Retail",
  //   "Energy & Industrial Products",
  //   "Healthcare & Pharma",
  // ];

  const serve = [
    {
      title: t("t16"),
      bg: "bg-slate-100",
      text: "text-black",
      border: "border-slate-400",
    },
    {
      title: t("t17"),
      bg: "bg-green-100",
      text: "text-black",
      border: "border-green-400",
    },
    {
      title: t("t18"),
      bg: "bg-rose-100",
      text: "text-black",
      border: "border-rose-400",
    },
    {
      title: t("t19"),
      bg: "bg-yellow-100",
      text: "text-black",
      border: "border-yellow-400",
    },
    {
      title: t("t20"),
      bg: "bg-purple-100",
      text: "text-black",
      border: "border-purple-400",
    },
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className=" h-screen overflow-y-scroll">
      {/* Navbar */}
      {/* <AboutNavbar /> */}

      {/* Top section with background image */}
      {/* <div
        className="bg-cover bg-center brightness-50 bg-no-repeat"
        style={{ backgroundImage: 'url("./trading/a2.jpg")', height: "400px" }}>
      
      </div> */}

      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-20">
          <AboutNavbar />
        </div>
        <div
          className="bg-cover  top-14 bg-center brightness-50 bg-no-repeat"
          style={{
            backgroundImage: 'url("./trading/a2.jpg")',
            height: "500px",
          }}
        >
          {/* Buttons */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold md:pt-20 text-white text-center">
            {t("trading")}
          </h1>
        </div>
      </div>

      {/* <h1 className="hidden md:block md:text-4xl font-bold px-10 pt-20">
        TRADING :
      </h1> */}

      <div className="bg-white py-10 md:pt-20 px-4 md:pl-32 md:pr-24">
        <div className=" ">
          {/* LEFT SECTION */}
          {/* <div className="">
            <img
              src="./trading/t1.jpg"
              alt="Factory"
              className="w-full md:w-[500px]  md:h-[650px] rounded-md shadow"
            />
          </div> */}

          {/* RIGHT SECTION */}
          <div className="">
            <div className="text-[22px] md:text-2xl font-bold">
              <Typewriter
                options={{
                  strings: [t("t1")],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            {/* <h3
              className="text-[20px] md:text-2xl my-4 font-bold mt-2 typewritert"
              id="oss"
            >
              Efficient Trading, Seamless Supply Chains, Global Reach.
            </h3> */}

            <p></p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t2")}</p>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("t3")}
            </h3>

            <p className="text-gray-700 mt-2 leading-relaxed">{t("t4")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t5")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t6")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t7")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t8")}</p>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("t9")}</p>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("t10")}
            </h3>

            <ul className="text-gray-700 mt-2 leading-relaxed custom-list space-y-3">
              <li>{t("t11")}</li>
              <li>{t("t12")}</li>
              <li>{t("t13")}</li>
              <li>{t("t14")}</li>
            </ul>

            <h3 className="md:text-2xl text-[22px] font-bold py-2 mt-2">
              {t("t15")}
            </h3>

            <div className="md:max-w-4xl md:my-20 my-10 gap-5  mx-auto grid grid-cols-2 md:grid-cols-3">
              {serve.map((s, i) => {
                return (
                  <span
                    className={` md:px-2 inline-block text-center rounded  py-2 md:py-3 text-[13px] md:text-[18px] bg-opacity-40 font-semibold ${s.bg} ${s.text} ${s.border}`}
                    key={i}
                  >
                    {s.title}
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

export default Trading;
