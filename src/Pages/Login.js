import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import home from "./download.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { userType } = useParams(); // Get userType from URL parameters

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Response:', response.data);
      const { user } = response.data;
      if (user.userType !== userType) {
        setErrorMessage('Wrong credentials for the selected user type.');
        return;
      }
      localStorage.setItem('token', response.data.token);
      if (user.userType === 'jobPoster') {
        navigate('/dashboard');
      } else {
        navigate('/homepage');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 relative">
      {/* Home Logo */}
      <Link to="/" className="absolute top-4 left-4">
        <img src={home} alt="Home Logo" className="w-12 h-12" />
      </Link>
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          {userType === 'jobPoster' ? 'Job Poster Login' : 'Job Seeker Login'}
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Login
          </button>
          <p className="mt-4 text-center text-gray-700">
            Don't have an account?
            <Link to={`/signup/${userType}`} className="text-blue-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
