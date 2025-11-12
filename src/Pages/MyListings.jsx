import React, { useEffect, useState } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaCar, FaTrash, FaEdit, FaDollarSign, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/cars/provider/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setCars(data);
          setLoading(false);
        })
        .catch(()=> {
          toast.error('Failed to load your listings');
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id, carName) => {
    Swal.fire({
      title: `Delete ${carName}?`,
      text: 'Are you sure you want to remove this car listing?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cars/${id}`, 
         { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setCars(cars.filter(car => car._id !== id));
              toast.success(`${carName} has been deleted!`);
            }
          })
          .catch(() => {
            toast.error('Failed to delete car listing');
          });
      }
    });
  };

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCar = {
      carName: form.carName.value,
      model: form.model.value,
      description: form.description.value,
      category: form.category.value,
      rentPrice: parseFloat(form.rentPrice.value),
      location: form.location.value,
      imageUrl: form.imageUrl.value,
      status: editingCar.status,
      providerName: editingCar.providerName,
      providerEmail: editingCar.providerEmail
    };

    try {
      const response = await fetch(`http://localhost:3000/cars/${editingCar._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
      });

      const result = await response.json();

      if (response.ok) {
        setCars(cars.map(car => 
          car._id === editingCar._id ? { ...car, ...updatedCar } : car
        ));
        setEditingCar(null);
        toast.success('Car updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-purple-600">Listings</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage all your added cars from one place
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {cars.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Cars Listed</h3>
            <p className="text-gray-600 mb-6">Add your first car to start earning!</p>
            <a
              href="/add-car"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Add New Car
            </a>
          </div>
        ) : (
          <>
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    <th className="p-4 text-left font-semibold">Image</th>
                    <th className="p-4 text-left font-semibold">Car Name</th>
                    <th className="p-4 text-left font-semibold">Category</th>
                    <th className="p-4 text-left font-semibold">Location</th>
                    <th className="p-4 text-left font-semibold">Rent Price</th>
                    <th className="p-4 text-center font-semibold">Status</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car, index) => (
                    <tr 
                      key={car._id} 
                      className={`border-b hover:bg-purple-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4">
                        <img 
                          src={car.imageUrl} 
                          className="w-20 h-20 object-cover rounded-lg shadow"
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{car.carName}</p>
                        <p className="text-sm text-gray-600">{car.model}</p>
                      </td>
                      <td className="p-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {car.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-purple-600" />
                          {car.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 font-bold text-green-600">
                          <FaDollarSign />
                          {car.rentPrice}/day
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            car.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {car.status === 'available' ? <FaCheckCircle /> : <FaTimesCircle />}
                          {car.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(car)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
                          >
                            <FaEdit /> Update
                          </button>
                          <button
                            onClick={() => handleDelete(car._id, car.carName)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for Mobile/Tablet */}
            <div className="lg:hidden space-y-4">
              {cars.map(car => (
                <div key={car._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <img 
                      src={car.imageUrl} 
                      alt={car.carName} 
                      className="w-full sm:w-40 h-40 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{car.carName}</h3>
                          <p className="text-sm text-gray-600">{car.model}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            car.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {car.status}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> {car.category}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Location:</span> {car.location}
                        </p>
                        <p className="text-sm font-bold text-green-600">
                          ${car.rentPrice}/day
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                        >
                          <FaEdit /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(car._id, car.carName)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Update Modal */}
        {editingCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Update Car</h2>
                  <button
                    onClick={() => setEditingCar(null)}
                    className="text-white hover:text-gray-200 text-3xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Car Name
                    </label>
                    <input
                      type="text"
                      name="carName"
                      defaultValue={editingCar.carName}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      defaultValue={editingCar.model}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingCar.description}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editingCar.category}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rent Price (per day)
                    </label>
                    <input
                      type="number"
                      name="rentPrice"
                      defaultValue={editingCar.rentPrice}
                      required
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingCar.location}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={editingCar.imageUrl}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingCar(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Update Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;