
import React from "react";
import { FaCalendarCheck, FaDollarSign, FaShieldAlt, FaHeadset } from "react-icons/fa";

const WhyRentWithUs = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaCalendarCheck className="text-5xl" />,
      title: "Easy Booking",
      description:
        "Book your dream car in minutes. Simple, fast, and hassle-free reservation process.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-5xl" />,
      title: "Affordable Rates",
      description:
        "We offer the best rental prices with transparent cost and no hidden charges.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-5xl" />,
      title: "Trusted Providers",
      description:
        "All cars are inspected & providers are verified for your complete safety.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      icon: <FaHeadset className="text-5xl" />,
      title: "24/7 Support",
      description:
        "We are always here for you. Contact us anytime for assistance.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Rent <span className="text-purple-600">With Us?</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            The most reliable and customer-friendly car rental service you can trust.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="group relative">
              <div
                className={`${benefit.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-200`}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className={`${benefit.iconColor} p-6 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 text-center">{benefit.description}</p>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="relative py-20 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/bj3McTTP/image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
          <div className="space-y-2">
            <p className="text-5xl md:text-6xl font-extrabold animate-fade-in-up">500+</p>
            <p className="text-orange-300 text-lg md:text-xl">Available Cars</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl md:text-6xl font-extrabold animate-fade-in-up animation-delay-200">10K+</p>
            <p className="text-orange-300 text-lg md:text-xl">Happy Customers</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl md:text-6xl font-extrabold animate-fade-in-up animation-delay-400">50+</p>
            <p className="text-orange-300 text-lg md:text-xl">Cities Covered</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl md:text-6xl font-extrabold animate-fade-in-up animation-delay-600">24/7</p>
            <p className="text-orange-300 text-lg md:text-xl">Support Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRentWithUs;
