import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const jpgImages = Array.from({ length: 18 }, (_, i) => `${i + 1}.jpg`);
const jpegImages = Array.from({ length: 7 }, (_, i) => `${i + 1}.jpeg`);

const images = [...jpgImages, ...jpegImages];

const settings = {
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

const mobileSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 1, // Desktop default
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

const Clients = ({ t }) => {
  return (
    <section className="bg-gradient-to-r py-5 md:py-10 ">
      <div className="slider-container w-[90%] hidden md:block mx-auto">
        <h1 className="pl-5 py-3 md:py-10 text-3xl font-bold md:text-[36px] text-center  text-black">
          {t("aboutteam")}
        </h1>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="py-10 px-4">
              <img
                src={`/our_clients/${img}`}
                alt={`slide-${index}`}
                className="w-full h-[200px] rounded-xl border-[7px] border-gray-200 shadow-lg "
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider-container w-[90%] md:hidden mx-auto">
        <h1 className="pl-5  md:py-10  text-3xl font-bold md:text-[36px]  text-[#29295e]">
          Our Team
        </h1>
        <Slider {...mobileSettings}>
          {images.map((img, index) => (
            <div key={index} className="py-10 px-4">
              <img
                src={`/our_clients/${img}`}
                alt={`slide-${index}`}
                className="w-full h-[200px] rounded-xl border-[7px] border-gray-200 shadow-lg "
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Clients;
