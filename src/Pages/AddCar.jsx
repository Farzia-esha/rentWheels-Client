import React, { useState } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaCar, FaDollarSign, FaMapMarkerAlt, FaImage, FaUser, FaEnvelope } from 'react-icons/fa';

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    
    const carData = {
      carName: form.carName.value,
      model: form.model.value,
      description: form.description.value,
      category: form.category.value,
      rentPrice: parseFloat(form.rentPrice.value),
      location: form.location.value,
      imageUrl: form.imageUrl.value,
      providerName: user?.displayName || 'Anonymous',
      providerEmail: user?.email,
    };

    try {
      const response = await fetch('https://rentwheels-server-five.vercel.app/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Car added successfully!');
        form.reset();
        navigate('/my-listings');
      } else {
        toast.error(result.message || 'Failed to add car');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Add Your <span className="text-purple-600">Car</span>
          </h1>
          <p className="text-lg text-gray-600">
            List your vehicle and start earning today
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <form onSubmit={handleAddCar} className="space-y-6">
            {/* Car name & model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCar className="text-purple-600" />
                  <span>Car Name</span>
                </label>
                <input
                  type="text"
                  name="carName"
                  required
                  placeholder="e.g., Toyota Camry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaCar className="text-purple-600" />
                  <span>Model</span>
                </label>
                <input
                  type="text"
                  name="model"
                  required
                  placeholder="e.g., Camry 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Describe your car's features, condition, and any special amenities..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Category & Rent Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaDollarSign className="text-green-600" />
                  <span>Rent Price (per day)</span>
                </label>
                <input
                  type="number"
                  name="rentPrice"
                  required
                  min="1"
                  step="0.01"
                  placeholder="e.g., 45"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location & Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaImage className="text-blue-600" />
                  <span>Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://example.com/car-image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Provider Info read-only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaUser className="text-purple-600" />
                  <span>Provider Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || 'Anonymous'}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaEnvelope className="text-purple-600" />
                  <span>Provider Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Btn */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Adding Car...</span>
                  </span>
                ) : (
                  'Add Car'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
             Important Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Use high-quality images for better visibility</li>
            <li>• Provide accurate and detailed descriptions</li>
            <li>• Set competitive pricing to attract more bookings</li>
            <li>• Keep your contact information up to date</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCar;