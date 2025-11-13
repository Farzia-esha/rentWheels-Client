import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Car, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../Provider/AuthProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Car', path: '/add-car', private: true },
    { name: 'My Listings', path: '/my-listings', private: true },
    { name: 'My Bookings', path: '/my-bookings', private: true },
    { name: 'Browse Cars', path: '/browse-cars' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Rent<span className="text-orange-400">Wheels</span>
              </h1>
              <p className="text-xs text-blue-100">Drive Your Dreams</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${isActive ? 'text-yellow-300 bg-white/10' : 'text-white hover:bg-white/10'}
                  ${link.private && !user ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="user-dropdown relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/2YjZtBL/default-avatar.png'}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-xl shadow-xl py-3 text-black transition-all duration-200 border border-purple-300">
                    <div className="px-4 pb-3 border-b border-purple-200">
                      <p className="font-bold text-purple-700 text-lg">
                        {user.displayName || 'Guest User'}
                      </p>
                      <p className="text-sm text-orange-600 font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 mt-2 rounded-lg hover:bg-purple-600 hover:text-white flex items-center space-x-2 transition-all duration-200 font-semibold text-purple-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 shadow"
              >
                Login / Signup
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block px-4 py-2 text-white hover:bg-white/10 rounded
                  ${link.private && !user ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                `}
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <div className="mt-5 mx-4 p-4 rounded-xl bg-purple-100 shadow-lg border border-purple-300">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/2YjZtBL/default-avatar.png'}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <p className="font-bold text-purple-700 text-lg">{user.displayName || 'Guest User'}</p>
                    <p className="text-sm text-orange-500 font-medium truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-4 bg-white text-purple-700 py-2 rounded-lg font-semibold"
              >
                Login / Signup
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

