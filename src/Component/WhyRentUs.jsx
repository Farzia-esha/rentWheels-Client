import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaDollarSign, FaShieldAlt, FaHeadset } from "react-icons/fa";

const iconMap = {
  FaCalendarCheck: <FaCalendarCheck className="text-5xl" />,
  FaDollarSign: <FaDollarSign className="text-5xl" />,
  FaShieldAlt: <FaShieldAlt className="text-5xl" />,
  FaHeadset: <FaHeadset className="text-5xl" />,
};

const WhyRentWithUs = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rentwheels-server-five.vercel.app/benefits")
      .then((res) => res.json())
      .then((data) => {
        setBenefits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching benefits:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {benefits.map((benefit) => (
            <div key={benefit._id} className="group relative">
              <div
                className={`${benefit.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-200`}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className={`${benefit.iconColor} p-6 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {iconMap[benefit.icon] || <FaCalendarCheck className="text-5xl" />}
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
    </section>
  );
};
export default WhyRentWithUs;
