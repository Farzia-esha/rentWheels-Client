import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Car, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();

  // Fake user state (you can remove and set to null if logged out)
  const [user, setUser] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Car', path: '/add-car' },
    { name: 'My Listings', path: '/my-listings' },
    { name: 'My Bookings', path: '/my-bookings'},
    { name: 'Browse Cars', path: '/browse-cars' },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        setShowDropdown(false);
        setMobileMenuOpen(false);
        navigate('/');
        Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
      }
    });
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Rent<span className='text-orange-400'>Wheels</span></h1>
              <p className="text-xs text-blue-100">Drive Your Dreams</p>
            </div>
          </Link>

          {/* Desktop  */}
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

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="user-dropdown relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/100"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <ChevronDown className={`w-4 h-4 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg py-2 text-black">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
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
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 shadow"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-white hover:bg-white/10"
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full mt-4 bg-red-500 py-2 rounded-lg font-semibold"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-4 bg-white text-blue-600 py-2 rounded-lg font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
