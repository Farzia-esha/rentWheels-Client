
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('user'); // default role

  // Firebase + MongoDB login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

      // 2️ MongoDB fetch user role

      const res = await fetch(`https://rentwheels-server-five.vercel.app/users`);
const users = await res.json();
const currentUser = users.find(u => u.email === email);
const role = currentUser?.role || 'user';



      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };



  const handleGoogleLogin = async () => {
  setLoading(true);
  try {
    const result = await googleLogin();
    const user = result.user;

    // save to MongoDB if not exists
    await fetch('https://rentwheels-server-five.vercel.app/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user',
        createdAt: new Date().toISOString()
      })
    });

    toast.success('Login successful with Google!');
    navigate('/');
  } catch (error) {
    toast.error('Google login failed');
  } finally {
    setLoading(false);
  }
};


  // Demo login
  const handleDemoLogin = async (type) => {
    const demo = {
      user: { email: 'user@demo.com', password: 'User@123' },
      admin: { email: 'admin@demo.com', password: 'Admin@123' }
    };

    try {
      setLoading(true);
      await loginUser(demo[type].email, demo[type].password);

      // Fetch role from MongoDB
      const res = await fetch(`https://rentwheels-server-five.vercel.app/users`);
      const users = await res.json();
      const currentUser = users.find(u => u.email === demo[type].email);
      setRole(currentUser?.role || 'user');

      toast.success(`Demo ${type} login successful!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Rent<span className="text-orange-500">Wheels</span>
          </h2>
          <p className="text-gray-600">Login to access your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleDemoLogin('user')}
            className="w-full bg-gray-200 py-2 rounded-lg font-semibold"
          >
            Demo User
          </button>
          <button
            onClick={() => handleDemoLogin('admin')}
            className="w-full bg-gray-300 py-2 rounded-lg font-semibold"
          >
            Demo Admin
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 hover:border-purple-600 py-3 rounded-lg font-semibold shadow hover:shadow-lg"
        >
          <FaGoogle className="text-red-500 text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
