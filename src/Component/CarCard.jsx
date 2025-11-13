import React from 'react';
import { useNavigate } from 'react-router';
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img src={car.imageUrl} alt={car.carName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
        
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-lg text-white ${car.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}>
          {car.status === 'available' ? <><FaCheckCircle className="inline text-xs mr-1"/>Available</> : <><FaTimesCircle className="inline text-xs mr-1"/>Booked</>}
        </div>

        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">{car.category}</div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{car.carName}</h3>
        <div className="text-sm text-gray-700 mb-2">
          <div className="flex items-center"><FaMapMarkerAlt className="mr-1 text-purple-600"/> {car.location}</div>
          <div className="flex items-center"><FaUser className="mr-1 text-purple-600"/> {car.providerName}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center"><FaDollarSign className="text-green-600 mr-1"/> ${car.rentPrice}/day</div>
          <button onClick={() => navigate(`/cars/${car._id}`)} className="bg-purple-600 text-white px-4 py-1 rounded-lg font-semibold">View</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
