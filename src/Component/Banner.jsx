import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import axios from 'axios';

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
    axios.get('http://localhost:3000/banners')
      .then(res => {
        setSlides(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading banners:', err);
        setLoading(false);
      });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {  staggerChildren: 0.2,  delayChildren: 0.3
    }}
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {opacity: 1,y: 0,
      transition: {  duration: 0.6,  ease: "easeOut"
    }}
  };
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
    }}
  };
  if (loading) {
    return (
      <div className="h-[400px] md:h-[500px] lg:h-[500px] flex items-center justify-center bg-purple-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }
  if (slides.length === 0) {
    return (
      <div className="h-[400px] md:h-[500px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
        <p className="text-white text-xl">No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-[500px] md:h-[600px] lg:h-[700px] banner-swiper"
      >
        {slides.map((slide, slideIndex) => (
          <SwiperSlide key={slide._id || slide.id}>
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
                initial={{ scale: 1.1 }}
                animate={{ 
                  scale: currentSlide === slideIndex ? 1 : 1.1 
                }}
                transition={{  duration: 1.5,  ease: "easeOut" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              </motion.div>
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div
                    className="max-w-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate={currentSlide === slideIndex ? "visible" : "hidden"}
                    key={`content-${slideIndex}`} >
                    <motion.h1
                      variants={itemVariants}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                    >
                      {currentSlide === slideIndex && (
                        <Typewriter  words={[slide.title]}  loop={1}  cursor  cursorStyle="|"  typeSpeed={70}  deleteSpeed={50}  delaySpeed={1000}
                        />
                      )}
                    </motion.h1>
                    <motion.p
                      variants={itemVariants}
                      className="text-xl md:text-2xl text-yellow-300 mb-4 font-semibold"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.p
                      variants={itemVariants} className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    {slide.features && slide.features.length > 0 && (
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-4 mb-8"
                      >
                        {slide.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            variants={featureVariants}
                            whileHover={{  scale: 1.05,  y: -2, transition: { duration: 0.2 }
                            }}
                            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
                          >
                            <FaCheckCircle className="text-green-400 text-lg" />
                            <span className="text-white text-sm md:text-base font-medium">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    <motion.div variants={itemVariants}>
                      <Link  to={slide.link || '/services'} className="inline-block">
                      <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)" 
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center space-x-3 bg-purple-600  hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 group"
                        >
                          <span>{slide.buttonText || 'Learn More'}</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{  duration: 1.5,  repeat: Infinity, ease: "easeInOut"
                            }}
                          >
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
                animate={{scale: [1, 1.2, 1],opacity: [0.3, 0.5, 0.3],
                }}
                transition={{duration: 3,repeat: Infinity,ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"
                animate={{scale: [1, 1.3, 1],opacity: [0.2, 0.4, 0.2],
                }}
                transition={{duration: 4,repeat: Infinity,ease: "easeInOut",delay: 0.5
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;