import React from 'react';
import Banner from '../Component/Banner';
import FeaturedCars from '../Component/FeaturedCars';
import WhyRentWithUs from '../Component/WhyRentUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <WhyRentWithUs></WhyRentWithUs>
        </div>
    );
};

export default Home;