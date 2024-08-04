import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id: jobId } = useParams(); // Extract jobId from URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const [jobResponse, appliedResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/auth/job-details/${jobId}`),
          axios.get('http://localhost:5000/api/auth/applied-jobs', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        setJob(jobResponse.data);
        setApplied(appliedResponse.data.includes(jobId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Error fetching job details. Please try again.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/auth/apply-job/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setApplied(true);
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error applying for job:', error.response || error);
      alert('Error applying for job. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="pt-20 p-4 max-w-3xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
        >
          Back
        </button>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Job Details</h1>
        {job ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-800">{job.jobRole}</h2>
            <p className="text-lg text-gray-600">Company: {job.companyName}</p>
            <p className="text-lg text-gray-600">Salary: {job.salary}</p>
            <p className="text-lg text-gray-600">Skills Required: {job.skillsRequired.join(', ')}</p>
            <p className="text-lg text-gray-600">Job Description: {job.description}</p>
            <p className="text-lg text-gray-600">Posted At: {new Date(job.postedAt).toLocaleDateString()}</p>
            <p className={`text-lg font-semibold mt-4 ${applied ? 'text-green-500' : 'text-yellow-500'}`}>
              Status: {applied ? 'Applied' : 'Not Applied'}
            </p>
            <button
              onClick={handleApply}
              disabled={applied}
              className={`mt-4 py-2 px-6 rounded-lg text-white transition duration-300 ${
                applied ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {applied ? 'Applied' : 'Apply'}
            </button>
          </div>
        ) : (
          <p>No job details available</p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
