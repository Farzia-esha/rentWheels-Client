import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import axios from 'axios';

const Banner = () => {
  const [slides, setSlides] = useState([]);

useEffect(() => {
  axios.get('http://localhost:3000/banners')
    .then(res => setSlides(res.data))
    .catch(err => console.error(err));
}, []);
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className="h-[500px] md:h-[600px] lg:h-[700px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-yellow-300 mb-4 font-semibold animate-fade-in-up animation-delay-200">
                      {slide.subtitle}
                    </p>

                    <p className="text-base md:text-lg text-gray-200 mb-6 animate-fade-in-up animation-delay-400">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up animation-delay-600">
                      {slide.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                        >
                          <FaCheckCircle className="text-green-400" />
                          <span className="text-white text-sm md:text-base font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-800"
                    >
                      <span>{slide.buttonText}</span>
                      <FaArrowRight className="animate-bounce-horizontal" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default Banner;