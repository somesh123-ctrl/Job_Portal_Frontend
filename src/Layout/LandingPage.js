import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-lg md:text-xl mb-8">Connect with top companies and advance your career.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = '/login/jobPoster'}
              className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Post a Job
            </button>
            <button
              onClick={() => window.location.href = '/login/jobSeeker'}
              className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-400 transition"
            >
              Search a Job
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-600">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Listings</h3>
              <p>Access a wide range of job listings from top companies worldwide.</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold mb-4">Easy Application</h3>
              <p>Apply for jobs quickly with our streamlined application process.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-lg shadow-md text-white">
              <h3 className="text-xl font-semibold mb-4">Career Resources</h3>
              <p>Benefit from our career advice, resume building, and interview tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-600">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <p className="mb-4 text-gray-700">“The best job portal I've ever used. Found my dream job in no time!”</p>
              <p className="font-semibold text-indigo-600">John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <p className="mb-4 text-gray-700">“Great platform for posting jobs and finding qualified candidates.”</p>
              <p className="font-semibold text-indigo-600">Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <p className="mb-4 text-gray-700">“Easy to navigate and very user-friendly. Highly recommended!”</p>
              <p className="font-semibold text-indigo-600">Alex Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
          <p className="mt-2">
            Follow us on{' '}
            <a href="#" className="underline">
              Twitter
            </a>
            ,{' '}
            <a href="#" className="underline">
              Facebook
            </a>
            , and{' '}
            <a href="#" className="underline">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
