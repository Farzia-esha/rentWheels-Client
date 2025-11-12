
import { Link } from 'react-router';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, HeartIcon } from 'lucide-react';
import { BiSupport } from 'react-icons/bi';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Rent<span className='text-orange-400'>Wheels</span></h3>
                <p className="text-xs text-gray-400">Drive Your Dreams</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted car rental platform connecting drivers with quality vehicles at affordable rates. Experience seamless booking and exceptional service.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-cars" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/add-car" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Add Car
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Main Street, Dhaka 1000, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm">support@rentwheels.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400"><BiSupport></BiSupport></span>
                </div>
                <span className="text-sm">24/7 Customer Support</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} RentWheels. All rights reserved. Made with love in Bangladesh <HeartIcon className='inline text-orange-500'></HeartIcon>
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;