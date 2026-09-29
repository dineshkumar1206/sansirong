import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Language interpretation",
    description:
      "We understand the importance of language in communication and aim to provide professional and reliable translation and interpretation services.",
    img: "/services/s1.webp", // replace with your image
  },
  {
    title: "Onsite support Services (OSS)",
    description:
      "We offer a wide range of services including document translation, website localization, interpretation for conferences, and more.",
    img: "/services/s2.jpg", // replace with your image
  },
  {
    title: "Trading",
    description:
      "We follow a strict process to ensure accuracy and quality, working closely with you to deliver exceptional results.",
    img: "/services/s3.jpg", // replace with your image
  },
];

const Service = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 2500, // 2.5 seconds delay
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };
  return (
    <div className="max-w-6xl  h-full mx-auto">
      <Slider {...settings}>
        {services.map((service, idx) => (
          <div
            className="relative  overflow-hidden rounded-lg shadow-lg group"
            style={{ height: "400px" }}>
            <img
              src={service.img}
              alt={service.title}
              className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ filter: "brightness(75%)" }}
            />
            {/* <div className="relative z-10 flex flex-col justify-center h-full p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed">{service.description}</p>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Service;
