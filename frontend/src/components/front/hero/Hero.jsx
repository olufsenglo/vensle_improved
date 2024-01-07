import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slider1 from "assets/img/front/hero/slider1.jpg";
import slider2 from "assets/img/front/hero/slider2.jpg";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
            <div>
                <img src={slider1} alt="slider" />
            </div>
            <div>
                <img src={slider1} alt="slider" />
            </div>
        </Slider>
      </div>
    </div>
  );
};

export default Hero;