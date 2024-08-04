import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ViewApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/view-applications/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure 'token' is used consistently
          }
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Error fetching applications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update-application-status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure 'token' is used consistently
          }
        }
      );
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status: response.data.status } : app
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Error updating application status. Please try again.');
    }
  };

  const handleViewDetails = (applicantId) => {
    navigate(`/applicant-details/${applicantId}`);
  };

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
      <div className="pt-20 px-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
        <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">
          Applicants for Job ID: {jobId}
        </h1>
        <ul className="list-disc ml-5 space-y-6">
          {applications.map((application) => (
            <li key={application._id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              <p className="font-bold text-gray-800">{application.applicant.name}</p>
              <p className="text-gray-600">{application.applicant.email}</p>
              <p className="text-gray-500">Status: {application.status}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => updateApplicationStatus(application._id, 'Hired')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Hire
                </button>
                <button
                  onClick={() => updateApplicationStatus(application._id, 'Rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleViewDetails(application.applicant._id)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewApplications;
