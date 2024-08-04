import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Layout/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/JobPoster/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Pages/JobPoster/Profile';
import PostJob from './Pages/JobPoster/PostJob';
import JobsHistory from './Pages/JobPoster/JobsHistory';
import Home from './Pages/JobSeeker/Home';
import ViewApplications from './Pages/JobPoster/ViewApplications';
import JobSeekerProfile from './Pages/JobSeeker/JobSeekerProfile';
import MyApplications from './Pages/JobSeeker/MyApplications';
import JobDetails from './Pages/JobSeeker/JobDetails';
import ApplicantDetails from './Pages/JobPoster/ApplicantDetails';

// import Dashboard from './Pages/Dashboard'; // Import Dashboard component
// import PostJob from './Pages/PostJob'; // Import PostJob component
// import JobsHistory from './Pages/JobsHistory'; // Import JobsHistory component
// import Profile from './Pages/Profile'; // Import Profile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/:userType" element={<Login />} />
        <Route path="/signup/:userType" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/jobposter-profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/post-job" element={<ProtectedRoute element={<PostJob/>} />} />
        <Route path="/jobs-history" element={<ProtectedRoute element={<JobsHistory/>} />} />
        <Route path="/view-applications/:jobId" element={<ProtectedRoute element={<ViewApplications/>} />} />
        <Route path="/applicant-details/:applicantId" element={<ProtectedRoute element={<ApplicantDetails/>} />} />


        <Route path="/homepage" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/jobseeker-profile" element={<ProtectedRoute element={<JobSeekerProfile />} />} />
        <Route path="/my-applications" element={<ProtectedRoute element={<MyApplications />} />} />
        <Route path="/job-details/:id" element={<ProtectedRoute element={<JobDetails />} />} />


        {/* <Route path="/jobs-history" element={<JobsHistory />} />
        <Route path="/profile" element={<Profile />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
