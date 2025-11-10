import React from 'react';
import { Link, useLoaderData } from 'react-router';

const BrowseCars = () => {
    const cars = useLoaderData();

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Browse Cars</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {cars.map(car => (
            <div key={car._id} className="border rounded-lg shadow p-4 bg-white">
            <img 
              src={car.imageUrl} 
              alt={car.carName} 
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">{car.carName}</h2>

            <p className="text-gray-600 capitalize">{car.category}</p>
            <p className="text-green-600 font-bold mt-2">${car.rentPrice} / day</p>
            <p className="text-gray-500 text-sm mt-1">{car.location}</p>

            <Link to={`/cars/${car._id}`}>
              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}

      </div>
        </div>
    );
};

export default BrowseCars;