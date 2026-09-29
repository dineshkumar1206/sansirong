import React, { useState } from "react";
import AboutNavbar from "../About/AboutNavbar";
import AboutFooter from "../About/AboutFooter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

const data = [
  {
    title: "Assembly Automation",
    content:
      "Bizten provides manufacturers with turnkey solutions customized to their customers’ specific needs, from single products to entire production lines, from design to completion. We help customers set up semi-automatic or fully automatic assembly lines for their products, and our experts have rich experience in process automation including linking, repairing, tapping, laser cutting, laser welding, laser marking, welding, hardening. , heat setting, pick and place, gluing, polishing, printing, scanning, plugging, laminating and cleaning.We follow an integrated and innovative approach to bring greater value to customers, including high productivity, high efficiency, superior quality, low cost, high safety operation and better return on investment.Our expertise covers a broad spectrum in the consumer electronics, automotive, telecommunications, medical, semiconductor and new energy sectors.",
  },
  {
    title: "Testing Automation",
    content:
      "Bizten provides testing solutions tailored to customer needs. Our products primarily support but are not limited to IT, FCT, audio, camera, connectivity, electronics, kinematics, LED, power, sensor and touch testing applications. Test Manager is extensible and modular in size and functionality. Our expertise covers a broad spectrum in the consumer electronics, automotive, telecommunications, medical, semiconductor and new energy sectors.",
  },
  {
    title: "Inspection Automation",
    content:
      "Bizten specializes in developing a complete solution for inspection requirements including aesthetics, size and functionality. With extensive and diverse combined experience in the design and manufacture of automated test equipment, our team provides innovative solutions that exceed customer expectations. Our expertise covers a broad spectrum in the consumer electronics, automotive, telecommunications, medical, semiconductor and new energy sectors.",
  },
  {
    title: "Packing Automation",
    content:
      "Bizten provides innovative and intelligent packaging solutions, from simple to complex requirements, semi-automatic or fully automatic depending on customer needs. Our equipment is flexible and scalable enough to keep up with rapidly changing manufacturing environments. Our expertise covers a broad spectrum in the consumer electronics, automotive, telecommunications, medical, semiconductor and new energy sectors.",
  },
  {
    title: "Intelligent Factory",
    content:
      "Bizten provides manufacturers with a complete solution to set up a smart factory, including but not limited to smart equipment, smart warehouse, smart logistics, IoT solutions industrial, manufacturing order processing systems, big data and enterprise resource planning. The system uses advanced technology. We provide customized turnkey solutions and help customers grow and compete in the global market by transforming their manufacturing processes to SMART. Our expertise covers a broad spectrum in the consumer electronics, automotive, telecommunications, medical, semiconductor and new energy sectors.",
  },
  {
    title: "Fixtures and Spare Parts",
    content:
      "Bizten can support you throughout the product development process for your assembly and parts needs, from simple to complex, at very competitive prices. Luminaires are holding or supporting devices used in the manufacturing industry and we are proficient in making luminaires for most manufacturing processes in the industries in which we operate.",
  },
];

const colors = [
  { bg: "bg-red-100", text: "text-black", border: "border-red-400" },
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
  { bg: "bg-pink-100", text: "text-black", border: "border-pink-400" },
  { bg: "bg-teal-100", text: "text-black", border: "border-teal-400" },
];

const OnsiteService = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const companies = [
    t("TEAL"),
    t("TATA"),
    t("Foxconn"),
    t("Pegatron"),
    t("ASM"),
    t("Bharat Forge"),
    t("Great Ventures"),
    t("JLK"),
    t("Indo-MIM"),
    t("J-Axis"),
    t("Salcomp"),
    t("Luster"),
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

  return (
    <div className=" md:pt-0  h-screen overflow-y-scroll">
      {/* Navbar */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-20">
          <AboutNavbar />
        </div>

        <div
          className="bg-cover  top-14 bg-center brightness-50 bg-no-repeat"
          style={{
            backgroundImage: 'url("./trading/a3.jpg")',
            height: "500px",
          }}
        >
          {/* Buttons */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold  text-white text-center">
            {t("oss")}
          </h1>
        </div>
      </div>

      {/* Top section with background image */}

      {/* <h1 className="hidden md:block md:text-4xl font-bold px-5 pt-20">
        Onsite Support Service (OSS) :
      </h1> */}

      <div className="bg-white  py-10 md:pt-20 px-4 md:pl-32 md:pr-20">
        {/* className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-10 "> */}
        <div className="">
          {/* LEFT SECTION */}
          <div className="">
            {/* <img
              src="./oss/o1.png"
              alt="Factory"
              className="w-full md:w-[500px]  md:h-[650px] rounded-md shadow"
            /> */}
          </div>

          {/* RIGHT SECTION */}
          <div className="">
            <div className="text-[22px] md:text-2xl font-bold">
              <Typewriter
                options={{
                  strings: [t("excellence")],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            {/* <p className="text-gray-700 mt-2 leading-relaxed">
              At{" "}
              <span className="font-semibold">
                SANSIRONG INTERNATIONAL PRIVATE LIMITED
              </span>{" "}
              is a leading Contract Development and Manufacturing Organisation
              (CDMO) in the medtech, consumer electronics, and automotive
              industries.
            </p> */}
            <p className="text-gray-700 mt-3 leading-relaxed">
              {t("engineeringpara")}
            </p>

            <h3 className="md:text-2xl text-[22px] font-bold mt-6">
              {t("Our Esteemed OSS Clients")}
            </h3>
            {/* <p className="text-gray-700 mt-2 leading-relaxed">
              From concept to commercialisation, our versatile “Design
              Everywhere, Build Anywhere” approach ensures we can innovate and
              develop products globally while manufacturing them at the most
              advantageous locations.
            </p> */}
            <h1 className="text-gray-500 py-5 text-xl font-bold">
              {t("proudly")}
            </h1>
            <div className="md:max-w-4xl md:my-20 my-10 gap-5  mx-auto grid grid-cols-3 md:grid-cols-5">
              {companies.map((company, index) => {
                const color = getRandomColor();
                return (
                  <span
                    key={index}
                    className={` inline-block text-center rounded bg-opacity-40  py-2 text-[13px] md:text-[18px] font-semibold ${color.bg} ${color.text} ${color.border}`}
                  >
                    {company}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* section -3 */}
        <div className="flex flex-col md:mt-16 md:flex-row md:justify-between gap-5 md:gap-10 ">
          {/* LEFT SECTION */}
          {/* <div className="order-2">
            <img
              src="./oss/02.jpg"
              alt="Factory"
              className="w-full md:w-[500px]  md:h-[650px] rounded-md shadow"
            />
          </div> */}

          {/* RIGHT SECTION */}
          <div className="">
            {/* <p className="text-sm uppercase text-gray-500 font-semibold">
              Scalable Production to Meet Market Demand
            </p> */}

            <h3 className="md:text-2xl text-[22px] font-bold mt-2">
              {t("Our Engineering Levels")}
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{t("para1")}</p>
            {/* <h1 className="text-2xl font-bold mt-2">Cost-Effectiveness</h1> */}
            <p className="text-sm md:text-lg uppercase py-5 leading-[30px] text-gray-500 font-semibold">
              {t("para2")}
            </p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para3")}</p>

            {/* <h3 className="text-2xl font-bold mt-6">
              Strategic Headquarters and Factory Locations
            </h3> */}
            <h1 className="md:text-2xl text-[22px] font-bold mt-5">
              {t("para4")}
            </h1>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para5")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para6")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para7")}</p>
            <h3 className="md:text-2xl text-[22px] font-bold mt-5">
              {t("para8")}
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para9")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para10")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para11")}</p>

            <p className="text-gray-700 mt-3 leading-relaxed">{t("para12")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para13")}</p>
            <p className="text-gray-700 mt-3 leading-relaxed">{t("para14")}</p>
          </div>
        </div>

        {/* section-3 */}
        <div className="">
          {/* LEFT SECTION */}
          {/* <div className="">
            <img
              src="./oss/o4.jpg"
              alt="Factory"
              className="w-full md:w-[500px] md:h-[650px] rounded-md shadow"
            />
          </div> */}

          {/* RIGHT SECTION */}
          {/* <div className="">
            <h3 className="text-2xl font-bold mt-2">Our Engineering Levels</h3>
            <p className="text-sm uppercase text-gray-500 font-semibold">
              At SANSIRONG INTERNATIONAL PRIVATE LIMITED
            </p>
            <ul className=" list-inside text-gray-700 mt-2 leading-relaxed">
              <li>Attendance follow-up with Geo-fencing</li>
              <li>Report submissions – Daily, weekly, and Monthly</li>
              <li>Learning Platform</li>
              <li>Assessment platform</li>
              <li>OSS grievance address platform</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6">
              Equip OSS engineers (L1 to L3) with advanced skills in:
            </h3>
            <ul className="list-inside text-gray-700 mt-2 leading-relaxed">
              <li>Automation Systems (PLC, HMI, VFD)</li>
              <li>Electromechanical Maintenance</li>
              <li>Vision System Integration</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6">
              Training Modules Overview
            </h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 leading-relaxed">
              <li>Automation: PLC Basics, Servo Motion, VFD</li>
              <li>
                Electromechanical: Fixture Assembly, Maintenance Protocols
              </li>
              <li>Vision: Camera Setup, Template Matching, Image Parameters</li>
              <li>Debugging: Software Logs, Root Cause Analysis</li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* section -4  */}

      {/* <div>
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 flex flex-col lg:flex-row items-start gap-10">
           
            <div className="flex-1 max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold  leading-snug">
                ONSITE SUPPORT <br /> Service (OSS)
              </h2>
              <p className="mt-4 text-sm lg:text-base leading-6 text-neutral-800 text-justify">
                Sansirong International Private Limited offers reliable{" "}
                <b>Onsite Support Services (OSS)</b> to ensure smooth,
                uninterrupted operations at your location. Our skilled
                professionals provide hands‑on technical and operational
                assistance for installation, troubleshooting, maintenance, and
                system upgrades. Whether it’s IT infrastructure, equipment
                setup, or specialized industry support, Sansirong ensures quick
                response times, minimal downtime, and customized
                solutions—delivered right at your doorstep. Empower your
                business with trusted onsite expertise from Sansirong.
              </p>
            </div>

          
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <img
                src="/oss/p1.png"
                alt="Top Left"
                className="w-[250px] rounded-lg object-cover"
              />
              <img
                src="/oss/p2.png"
                alt="Top Right"
                className="w-[400px] max-w-full rounded-lg object-cover"
              />
              <img
                src="/oss/p3.png"
                alt="Bottom Left"
                className="w-[400px] max-w-full rounded-lg object-cover"
              />
              <img
                src="/oss/p4.png"
                alt="Bottom Right"
                className="w-[400px] max-w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
      </div> */}

      <section className="py-12 hidden md:block mt-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-10">
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
                <div className="   transition duration-300">
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
