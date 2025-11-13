import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaCar, FaMapMarkerAlt, FaDollarSign, FaUser, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';

const BrowseCars = () => {
  const allCars = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'price-low') return a.rentPrice - b.rentPrice;
    if (sortBy === 'price-high') return b.rentPrice - a.rentPrice;
    if (sortBy === 'name') return a.carName.localeCompare(b.carName);
    return 0;
  });

  const categories = ['All', 'Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric'];

  return (
    <div className="min-h-screen bg-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse <span className="text-purple-600">All Cars</span>
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect ride from our extensive collection
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-purple-600">{sortedCars.length}</span> of{' '}
              <span className="font-bold">{allCars.length}</span> cars
            </p>
          </div>
        </div>

        {sortedCars.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaCar className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Cars Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCars.map((car) => (
              <div
                key={car._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={car.imageUrl}
                    alt={car.carName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
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
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Model:</strong> {car.model}
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
                      <FaDollarSign className="text-green-600" />
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          ${car.rentPrice}
                        </p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                    </div>

                    <Link to={`/cars/${car._id}`}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                      <span>View Details</span>
                      <FaCar className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;