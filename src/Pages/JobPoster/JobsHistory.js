import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { MdWork, MdAttachMoney, MdVerified } from 'react-icons/md';

const JobsHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/jobs-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Error fetching jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center text-gray-600">
          <FiLoader className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center text-red-500">
          <FiAlertCircle className="h-8 w-8 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <Navbar />
      <div className="pt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Jobs History</h1>
        <ul className="list-none space-y-6">
          {jobs.map((job) => (
            <li key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <MdWork className="mr-2" /> {job.jobRole}
                  </h2>
                  <p className="text-lg text-gray-700">{job.companyName}</p>
                </div>
                <button
                  className={`text-white px-4 py-2 rounded-lg ${job.jobApplications.length > 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={job.jobApplications.length === 0}
                  onClick={() => {
                    if (job.jobApplications.length > 0) {
                      window.location.href = `/view-applications/${job._id}`;
                    }
                  }}
                >
                  View Applications
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-lg text-gray-700 flex items-center">
                  <MdAttachMoney className="mr-2" /> Salary: ${job.salary}
                </p>
                <p className="text-lg text-gray-700 flex items-center">
                  <MdVerified className="mr-2" /> Skills Required: {job.skillsRequired.join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobsHistory;
