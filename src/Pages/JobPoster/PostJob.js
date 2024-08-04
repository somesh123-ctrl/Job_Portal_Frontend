import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    companyName: '',
    salary: '',
    skillsRequired: ''
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skillsRequired.split(',').map(skill => skill.trim());

    try {
      const response = await axios.post('http://localhost:5000/api/auth/post-job', 
        { ...formData, skillsRequired: skillsArray }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Job posted successfully!');
      setMessage('Job posted successfully!');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error posting job:', error.response.data);
      setMessage('Error posting job. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <Navbar />
      <div className="pt-20 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">Post a Job</h1>
        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700">Job Role</label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Skills Required (comma-separated)</label>
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
            Post Job
            </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
