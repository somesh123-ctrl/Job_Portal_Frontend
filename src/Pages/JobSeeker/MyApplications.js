import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/auth/detailed-applied-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAppliedJobs(response.data);
      } catch (err) {
        setError('Error fetching applied jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <div className="text-center text-xl mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-xl mt-20">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-5xl font-extrabold mb-8 text-center text-gray-800">My Applications</h2>
        {appliedJobs.length === 0 ? (
          <p className="text-center text-lg text-gray-700">You have not applied for any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appliedJobs.map(job => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                <h3 className="text-2xl font-bold mb-2 text-blue-700">{job.jobRole}</h3>
                <p className="text-lg mb-1 text-gray-700">{job.companyName}</p>
                <p className="text-md mb-1 text-gray-600">Salary: {job.salary}</p>
                <p className="text-md mb-1 text-gray-600">
                  Skills Required: {job.skillsRequired ? job.skillsRequired.join(', ') : 'N/A'}
                </p>
                <p className="text-md mb-1 text-gray-600">Applied At: {new Date(job.appliedAt).toLocaleDateString()}</p>
                <p className={`text-md mb-1 font-semibold ${job.status === 'Rejected' ? 'text-red-500' : job.status === 'Hired' ? 'text-green-500' : 'text-yellow-500'}`}>
                  Status: {job.status}
                </p>
                <Link to={`/job-details/${job._id}`} className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  View Job Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
