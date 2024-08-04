import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    jobsPosted: 0,
    applicationsReceived: 0,
    topJob: 'N/A',
    averageResponseTime: 'N/A'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error fetching dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchDashboardData();
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
      <div className="pt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Welcome to the Dashboard</h1>
        <p className="mb-6 text-lg text-center text-gray-600">Here is some generic homepage data for job posters.</p>
        <ul className="list-disc ml-5 space-y-6">
          <li className="text-xl bg-blue-50 p-4 rounded-md shadow-md hover:bg-blue-100 transition duration-300">
            Number of jobs posted: <span className="font-bold text-blue-600">{dashboardData.jobsPosted}</span>
          </li>
          <li className="text-xl bg-green-50 p-4 rounded-md shadow-md hover:bg-green-100 transition duration-300">
            Applications received: <span className="font-bold text-green-600">{dashboardData.applicationsReceived}</span>
          </li>
          <li className="text-xl bg-yellow-50 p-4 rounded-md shadow-md hover:bg-yellow-100 transition duration-300">
            Top performing job: <span className="font-bold text-yellow-600">{dashboardData.topJob}</span>
          </li>
          <li className="text-xl bg-red-50 p-4 rounded-md shadow-md hover:bg-red-100 transition duration-300">
            Average response time: <span className="font-bold text-red-600">{dashboardData.averageResponseTime}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
