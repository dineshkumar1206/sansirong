import React, { Component } from "react";
import Slider from "react-slick";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="/partners/p1.png" alt="p1" className="h-10" />
        </div>
        <div>
          <img src="/partners/p2.png" alt="p1" className="h-10" />
        </div>
        <div>
          <img src="/partners/p3.png" alt="p1" className="h-10" />
        </div>
        <div>
          <img src="/partners/p4.png" alt="p1" className="h-10" />
        </div>
        <div>
          <img src="/partners/p5.png" alt="p1" className="h-10" />
        </div>
        <div>
          <img src="/partners/p6.png" alt="p1" className="h-10" />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
