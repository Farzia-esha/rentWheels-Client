import React from 'react';
import Banner from '../Component/Banner';
import FeaturedCars from '../Component/FeaturedCars';
import WhyRentWithUs from '../Component/WhyRentUs';
import Testimonials from '../Component/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <WhyRentWithUs></WhyRentWithUs>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;