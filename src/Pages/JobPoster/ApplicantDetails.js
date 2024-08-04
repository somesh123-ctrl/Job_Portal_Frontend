import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  // Assuming you have a Navbar component

const ApplicantDetails = () => {
  const { applicantId } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/applicant-details/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setApplicant(response.data);

        if (response.data.resume) {
          const filename = response.data.resume.split('/').pop();
          setResumeUrl(`http://localhost:5000/api/auth/resume/${filename}`);
        }
      } catch (error) {
        console.error('Error fetching applicant details:', error);
        setError('Error fetching applicant details. Please try again.');
      }
    };

    fetchApplicant();
  }, [applicantId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <Navbar /> {/* Adding Navbar */}
      <div className="pt-20 px-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">Applicant Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </button>
        </div>
        {applicant ? (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold">Name: <span className="font-normal">{applicant.name}</span></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold">Email: <span className="font-normal">{applicant.email}</span></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold">Highest Qualification: <span className="font-normal">{applicant.highestQualification}</span></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold">Interested Role: <span className="font-normal">{applicant.interestedRole}</span></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold">Skillset: <span className="font-normal">{applicant.skillset ? applicant.skillset.join(', ') : 'N/A'}</span></p>
            </div>

            {resumeUrl ? (
              <div className="mt-6">
                <h2 className="text-2xl font-bold">Resume:</h2>
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={resumeUrl}
                    className="absolute top-0 left-0 w-full h-full border rounded-lg"
                    frameBorder="0"
                    title="Resume"
                  ></iframe>
                </div>
              </div>
            ) : (
              <p className="text-xl font-bold mt-6">Data not available</p>
            )}
          </div>
        ) : (
          <p className="text-center text-xl">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetails;
