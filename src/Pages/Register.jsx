import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return 'At least one uppercase letter required';
    if (!/[a-z]/.test(password)) return 'At least one lowercase letter required';
    if (password.length < 6) return 'Password must be 6 characters long';
    return null;
  };


  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { name, email, photoURL, password } = e.target;

  const error = validatePassword(password.value);
  if (error) {
    toast.error(error);
    setLoading(false);
    return;
  }

  try {
    const result = await registerUser(email.value, password.value);
    console.log(result);

    await updateUserProfile(name.value, photoURL.value);

    const res = await fetch(
      'https://rentwheels-server-five.vercel.app/users',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          photoURL: photoURL.value,
          role: 'user',
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'User save failed');
    }

    toast.success('Account created successfully!');
    navigate('/');

  } catch (err) {
    console.error(err);

    if (err.code === 'auth/email-already-in-use') {
      toast.error('This email is already registered. Please login.');
    } else {
      toast.error(err.message || 'Registration failed');
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      await fetch('https://rentwheels-server-five.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user'
        })
      });

      toast.success('Logged in with Google!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" placeholder="Full Name" required className="input" />
          <input name="email" type="email" placeholder="Email" required className="input" />
          <input name="photoURL" placeholder="Photo URL" required className="input" />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-purple-700 text-white py-2 rounded"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 border py-2 rounded flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
