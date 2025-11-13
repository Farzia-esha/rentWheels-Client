
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import CarCard from './CarCard';

const SearchCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/cars')
      .then(res => res.json())
      .then(data => setAllCars(data))
      .catch(err => console.error(err));
  }, []);

  const filteredCars = searchTerm.trim() === '' ? [] : allCars.filter(car => 
    car.carName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 pl-3 py-2 border rounded-lg"
        />
        <button onClick={() => {}} className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
          <FaSearch/> Search
        </button>
      </div>

      {searchTerm && (
        filteredCars.length === 0 ? (
          <p className="text-center text-gray-500">No cars found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map(car => <CarCard key={car._id} car={car} />)}
          </div>
        )
      )}
    </div>
  );
};

export default SearchCars;
