
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../Provider/AuthProvider";
import { FaCar, FaMapMarkerAlt, FaDollarSign, FaUser, FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load',
          text: 'Car details could not be loaded. Please try again later.',
          confirmButtonColor: '#9333ea',
        });
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to book a car.',
        confirmButtonColor: '#9333ea',
      }).then(() => navigate('/login'));
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: 'Book Your Car',
      html: `
        <div class="text-left space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Start Date</label>
            <input type="date" id="startDate" class="swal2-input w-full" min="${new Date().toISOString().split('T')[0]}" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">End Date</label>
            <input type="date" id="endDate" class="swal2-input w-full" min="${new Date().toISOString().split('T')[0]}" required>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Confirm Booking',
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#6b7280',
      preConfirm: () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!startDate || !endDate) {
          Swal.showValidationMessage('Please select both dates');
          return false;
        }

        if (new Date(endDate) <= new Date(startDate)) {
          Swal.showValidationMessage('End date must be after start date');
          return false;
        }

        return { startDate, endDate };
      }
    });

    if (formValues) {
      setBookingLoading(true);

      const bookingData = {
        carId: car._id,
        carName: car.carName,
        carImage: car.imageUrl,
        model: car.model,
        category: car.category,
        rentPrice: car.rentPrice,
        location: car.location,
        providerName: car.providerName,
        providerEmail: car.providerEmail,
        userName: user?.displayName,
        userEmail: user?.email,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        totalDays: Math.ceil((new Date(formValues.endDate) - new Date(formValues.startDate)) / (1000 * 60 * 60 * 24)),
        totalPrice: Math.ceil((new Date(formValues.endDate) - new Date(formValues.startDate)) / (1000 * 60 * 60 * 24)) * car.rentPrice,
      };

      try {
        const response = await fetch('http://localhost:3000/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        });

        const result = await response.json();

        if (response.ok) {
          setCar({ ...car, status: 'booked' });
          Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed!',
            html: `
              <div class="text-left space-y-2">
                <p><strong>Car:</strong> ${car.carName}</p>
                <p><strong>Dates:</strong> ${formValues.startDate} to ${formValues.endDate}</p>
                <p><strong>Total Days:</strong> ${bookingData.totalDays}</p>
                <p><strong>Total Price:</strong> $${bookingData.totalPrice}</p>
              </div>
            `,
            confirmButtonColor: '#9333ea',
          }).then(() => navigate('/my-bookings'));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Booking Failed',
            text: result.message || 'Something went wrong. Please try again.',
            confirmButtonColor: '#9333ea',
          });
        }
      } catch (error) {
        console.error('Error booking car:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while booking. Please try again.',
          confirmButtonColor: '#9333ea',
        });
      } finally {
        setBookingLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Car not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
        >
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96 lg:h-full">
              <img src={car.imageUrl} alt={car.carName} className="w-full h-full object-cover" />

              <div className="absolute top-6 right-6">
                {car.status === 'available' ? (
                  <span className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <FaCheckCircle />
                    <span>Available</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <FaTimesCircle />
                    <span>Booked</span>
                  </span>
                )}
              </div>

              <div className="absolute top-6 left-6">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {car.category}
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{car.carName}</h1>
              <div className="flex items-center space-x-2 mb-6">
                <FaCar className="text-purple-600" />
                <p className="text-lg text-gray-700"><strong>Model:</strong> {car.model}</p>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">{car.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <FaMapMarkerAlt className="text-purple-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{car.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <FaDollarSign className="text-green-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Rent Price</p>
                    <p className="font-semibold text-gray-900">${car.rentPrice} per day</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FaUser className="text-blue-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    <p className="font-semibold text-gray-900">{car.providerName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                  <FaEnvelope className="text-orange-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold text-gray-900">{car.providerEmail}</p>
                  </div>
                </div>
              </div>

              {car.status === 'available' ? (
                <button
                  onClick={handleBookNow}
                  disabled={bookingLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Book Now'
                  )}
                </button>
              ) : (
                <div className="w-full bg-gray-300 text-gray-600 py-4 rounded-lg font-bold text-lg text-center cursor-not-allowed">
                  Currently Unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
