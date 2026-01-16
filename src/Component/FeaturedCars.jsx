import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaCar, FaMapMarkerAlt, FaDollarSign, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://rentwheels-server-five.vercel.app/cars/featured')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-purple-600">Cars</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our newest collection of premium vehicles available for rent
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={car.imageUrl}
                  alt={car.carName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute top-4 right-4">
                  {car.status === 'available' ? (
                    <span className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      <FaCheckCircle className="text-xs" />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      <FaTimesCircle className="text-xs" />
                      <span>Booked</span>
                    </span>
                  )}
                </div>

                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {car.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {car.carName}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-bold">
                 model : {car.model}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="text-purple-600 mr-2 text-sm" />
                    <span className="text-sm">{car.location}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <FaUser className="text-purple-600 mr-2 text-sm" />
                    <span className="text-sm">{car.providerName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${car.rentPrice}
                      </p>
                      <p className="text-xs text-gray-500">per day</p>
                    </div>
                  </div>

                  <Link
                    to={`/cars/${car._id}`}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <FaCar className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/browse-cars"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;