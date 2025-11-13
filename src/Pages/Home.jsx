import React from 'react';
import Banner from '../Component/Banner';
import FeaturedCars from '../Component/FeaturedCars';
import WhyRentWithUs from '../Component/WhyRentUs';
import Testimonials from '../Component/Testimonials';
import TopRatedCar from '../Component/TopRatedCar';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <WhyRentWithUs></WhyRentWithUs>
            <TopRatedCar></TopRatedCar>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;