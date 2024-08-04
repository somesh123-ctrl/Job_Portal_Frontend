import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({ salaryRange: '', jobRole: '' });
  const [sortOrder, setSortOrder] = useState('');
  const [applying, setApplying] = useState({}); // To manage loading state for each job

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [jobsResponse, appliedJobsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/all-jobs', {
            params: { ...filters, sortOrder }
          }),
          axios.get('http://localhost:5000/api/auth/applied-jobs', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        setJobs(jobsResponse.data);
        setAppliedJobs(appliedJobsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Error fetching jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, sortOrder]);

  const handleApply = async (jobId) => {
    try {
      setApplying((prev) => ({ ...prev, [jobId]: true })); // Set loading state for the job
      console.log('Applying for job with ID:', jobId);
      const response = await axios.post(
        `http://localhost:5000/api/auth/apply-job/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log('Application response:', response);
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Application submitted successfully');
    } catch (error) {
      console.error('Error applying for job:', error.response || error);
      alert('Error applying for job. Please try again.');
    } finally {
      setApplying((prev) => ({ ...prev, [jobId]: false })); // Reset loading state
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <Navbar />
      <div className="pt-20 p-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Available Jobs</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            name="jobRole"
            value={filters.jobRole}
            onChange={handleFilterChange}
            placeholder="Search by job role"
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="salaryRange"
            value={filters.salaryRange}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Salary Range</option>
            <option value="0-50000">0 - 50,000</option>
            <option value="50000-100000">50,000 - 100,000</option>
            <option value="100000-150000">100,000 - 150,000</option>
          </select>
          <select
            name="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Sort by</option>
            <option value="salary-asc">Salary: Low to High</option>
            <option value="salary-desc">Salary: High to Low</option>
          </select>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li key={job._id} className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                <h2 className="text-2xl font-bold text-blue-800">{job.jobRole}</h2>
                <p className="text-lg text-gray-600">{job.companyName}</p>
                <p className="text-lg text-gray-600">Salary: {job.salary}</p>
                <p className="text-lg text-gray-600">Skills Required: {job.skillsRequired.join(', ')}</p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={appliedJobs.includes(job._id) || applying[job._id]}
                    className={`py-2 px-6 rounded-lg text-white transition duration-300 ${
                      appliedJobs.includes(job._id) || applying[job._id]
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                  >
                    {applying[job._id] ? 'Applying...' : appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
                  </button>
                  <Link
                    to={`/job-details/${job._id}`}
                    className="ml-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
