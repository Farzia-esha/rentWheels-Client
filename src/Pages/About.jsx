import { Car } from 'lucide-react';
import React from 'react';
import { FaCar, FaUsers, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">About RentWheels</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Your trusted platform for safe, reliable, and affordable car rentals.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RentWheels is a modern car rental platform designed to make
              renting vehicles easy, transparent, and secure. Whether you
              need a car for a day, a trip, or long-term use — we’ve got you
              covered.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform connects car owners and renters with trust,
              flexibility, and convenience at the core.
            </p>
          </div>

          {/* <img
            src=""
            alt="About RentWheels"
            className="rounded-xl shadow-lg"
          /> */}
          <div className='md:pl-20'><div className="pl-15 rounded-lg">
              <Car className="w-1/3 h-1/2" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">
                Rent<span className="text-orange-400">Wheels</span>
              </h1>
              <p className=" text-gray-800">Drive Your Dreams</p>
            </div></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose RentWheels
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature
              icon={<FaCar />}
              title="Wide Car Selection"
              text="Choose from economy to luxury vehicles."
            />
            <Feature
              icon={<FaShieldAlt />}
              title="Secure Booking"
              text="Verified users and secure payments."
            />
            <Feature
              icon={<FaUsers />}
              title="Trusted Community"
              text="Real users, real reviews, real trust."
            />
            <Feature
              icon={<FaHandshake />}
              title="Easy Experience"
              text="Smooth booking & reliable support."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
    <div className="text-purple-700 text-4xl mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {text}
    </p>
  </div>
);

export default About;
