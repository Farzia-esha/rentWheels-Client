import React, { useEffect, useState } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { FaCar, FaTrash, FaCalendar, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
//bookings
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
    }
  }, [user]);

  // Cancel booking
  const handleCancelBooking = (id, carName) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: `Are you sure you want to cancel booking for ${carName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setBookings(bookings.filter(booking => booking._id !== id));
              Swal.fire({
                icon: 'success',
                title: 'Cancelled!',
                text: 'Your booking has been cancelled and the car is now available.',
                confirmButtonColor: '#9333ea',
              });
            }
          })
      }
    });
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
            My <span className="text-purple-600">Bookings</span>
          </h1>
          <p className="text-lg text-gray-600">
            View and manage your car bookings
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaCar className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">Start exploring and book your first car!</p>
            <a
              href="/browse-cars"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Browse Cars
            </a>
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                    <p className="text-3xl font-bold text-purple-600">{bookings.length}</p>
                  </div>
                  <FaCar className="text-4xl text-purple-600 opacity-40" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Days</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {bookings.reduce((sum, booking) => sum + booking.totalDays, 0)}
                    </p>
                  </div>
                  <FaCalendar className="text-4xl text-blue-600 opacity-40" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                    <p className="text-3xl font-bold text-green-600">
                      ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}
                    </p>
                  </div>
                  <FaDollarSign className="text-4xl text-green-600 opacity-60" />
                </div>
              </div>
            </div>

            {/* Bookings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map(booking => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Car Image */}
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={booking.carImage}
                        alt={booking.carName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {booking.carName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            <strong>Model:</strong> {booking.model}
                          </p>
                        </div>
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.category}
                        </span>
                      </div>

                      {/* Booking Info */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <FaMapMarkerAlt className="text-purple-600" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <FaCalendar className="text-blue-600" />
                          <span>
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="text-xs text-gray-600">Total Cost</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${booking.totalPrice}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Duration</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {booking.totalDays} days
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Provider Info */}
                      <div className="p-3 bg-gray-50 rounded-lg mb-4">
                        <p className="text-xs text-gray-600 mb-1">Provider</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.providerName}</p>
                        <p className="text-xs text-gray-600">{booking.providerEmail}</p>
                      </div>

                      <button
                        onClick={() => handleCancelBooking(booking._id, booking.carName)}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <FaTrash />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MyBookings;