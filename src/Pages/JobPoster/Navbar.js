import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('token'); // Adjust as necessary if you're using sessionStorage or different keys
    // Redirect to landing page
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 text-white fixed w-full top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          <Link to="/dashboard" className="hover:text-gray-100 transition duration-300">Job Portal</Link>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <ul className={`lg:flex lg:items-center lg:space-x-8 ${isMenuOpen ? 'block animate-slideIn' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 lg:bg-transparent lg:shadow-none shadow-md lg:shadow-none mt-4 lg:mt-0 transition-transform transform duration-300 ease-in-out`}>
          <li><Link to="/dashboard" className="block px-4 py-2 text-center text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 rounded-md">Home</Link></li>
          <li><Link to="/post-job" className="block px-4 py-2 text-center text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 rounded-md">Post Job</Link></li>
          <li><Link to="/jobs-history" className="block px-4 py-2 text-center text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 rounded-md">Jobs History</Link></li>
          <li><Link to="/jobposter-profile" className="block px-4 py-2 text-center text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 rounded-md">Profile</Link></li>
          <li>
            <button onClick={handleLogout} className="block w-full text-center px-4 py-2 text-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition duration-300 rounded-md mt-2 lg:mt-0">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
