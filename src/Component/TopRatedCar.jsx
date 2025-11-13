import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaCar, FaMapMarkerAlt, FaDollarSign, FaUser, FaStar } from 'react-icons/fa';

const TopRatedCar = () => {
  const [topCars, setTopCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/cars')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4).map(car => ({
          ...car,
          rating: (4.0 + Math.random() * 1).toFixed(1), 
          reviews: Math.floor(Math.random() * 100) + 20 
        }));
        setTopCars(selected);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching top cars:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Rated <span className="text-purple-600">Cars</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved vehicles rated by thousands of satisfied customers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCars.map((car, index) => (
            <div
              key={car._id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-purple-300"
            >
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  #{index + 1}
                </div>
              </div>

              <div className="relative overflow-hidden h-48">
                <img
                  src={car.imageUrl}
                  alt={car.carName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-95 px-3 py-2 rounded-full shadow-lg flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold text-gray-900">{car.rating}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {car.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {car.carName}
                </h3>

                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-2">({car.reviews} reviews)</span>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="text-purple-600 mr-2 text-xs" />
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaUser className="text-purple-600 mr-2 text-xs" />
                    <span>{car.providerName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <div className="flex items-center space-x-1">
                      <FaDollarSign className="text-green-600 text-sm" />
                      <p className="text-xl font-bold text-green-600">
                        {car.rentPrice}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">per day</p>
                  </div>

                  <Link
                    to={`/cars/${car._id}`}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/browse-cars"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Explore All Top Rated Cars</span>
            <FaCar />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCar;