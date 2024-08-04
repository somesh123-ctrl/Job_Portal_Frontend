import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching profile. Please try again.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
        <Navbar />
        <div className="pt-20 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center text-gray-600">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
        <Navbar />
        <div className="pt-20 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <Navbar />
      <div className="pt-20 p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">Profile</h1>
        <div className="text-center mb-6">
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300 shadow-md"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold text-gray-700">Name: <span className="font-normal">{user.name}</span></p>
          <p className="text-xl font-semibold text-gray-700">Email: <span className="font-normal">{user.email}</span></p>
          <p className="text-xl font-semibold text-gray-700">Company Name: <span className="font-normal">{user.companyName}</span></p>
          <p className="text-xl font-semibold text-gray-700">Company Type: <span className="font-normal">{user.companyType}</span></p>
          <p className="text-xl font-semibold text-gray-700">Additional Details: <span className="font-normal">{user.additionalDetails}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
