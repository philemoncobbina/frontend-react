import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane, FaEnvelope, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { X } from "lucide-react";

const Footer = () => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        setIsAlertOpen(false);
      }, 30000); // Auto-close after 30 seconds
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.plvcmonline.uk/api/subscriptions/', {
        full_name: full_name,
        email: email,
      });
      console.log('Form submitted successfully:', response.data);

      // Reset form fields
      setFullName('');
      setEmail('');

      // Show success modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting the form:', error);

      if (error.response && error.response.data) {
        // Display the backend error message if available
        setErrorMessage(error.response.data.email?.[0] || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('Failed to submit. Please try again later.');
      }

      setIsAlertOpen(true);
    }
  };

  return (
    <footer className="text-white bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="flex items-center space-x-2 text-lg font-semibold">
            <FaEnvelope size={20} />
            <span>Subscribe to Newsletter</span>
          </p>
        </div>
        
        <div style={{ marginBottom: '5rem' }} className="flex flex-col mb-8">
          {errorMessage && isAlertOpen && (
            <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <span className="block sm:inline">{errorMessage}</span>
              <button
                onClick={handleCloseAlert}
                className="absolute top-0 right-0 p-2"
                aria-label="Close alert"
              >
                <FaTimes />
              </button>
            </div>
          )}
          {isModalOpen && (
                      <div  className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="fixed inset-0 bg-black opacity-50"></div>
                          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 relative z-50 shadow-xl">
                              <button
                                  onClick={() => setIsModalOpen(false)}
                                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                  <X size={20} />
                              </button>
                              <div className="mb-1">
                                  <div className="h-12 w-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                  </div>
                              </div>
                              <h3 className="text-lg font-semibold text-center text-gray-900 mt-4">
                                  Success
                              </h3>
                              <p className="mt-2 text-center text-gray-600">
                              Subscribed successfully!
                              </p>
                          </div>
                      </div>
                  )}
                  
          
          <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full">
              <input
                type="text"
                id="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter full name"
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaPaperPlane className="mr-2" />
              Send
            </button>
          </form>
        </div>
        
        {/* Modal for Success Message */}
        

        {/* Social and other sections */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Our School</h1>
            <p>Welcome to our school, where we foster a nurturing environment for academic excellence and personal growth. Contact us for more information.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Academics</h2>
            <ul>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Curriculum</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Departments</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Library</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Research</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Admissions</h2>
            <ul>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">How to Apply</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Tuition & Fees</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Scholarships</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Community</h2>
            <ul>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Events</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Alumni</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Parents</a></li>
              <li className="mb-1"><a href="#" className="no-underline text-white hover:underline">Volunteer</a></li>
            </ul>
          </div>
        </div>
        <div className="flex mt-3 space-x-4">
          <a href="#" className="text-white hover:text-gray-400 no-underline"><FaFacebook size={24} /></a>
          <a href="#" className="text-white hover:text-gray-400 no-underline"><FaTwitter size={24} /></a>
          <a href="#" className="text-white hover:text-gray-400 no-underline"><FaInstagram size={24} /></a>
          <a href="#" className="text-white hover:text-gray-400 no-underline"><FaLinkedin size={24} /></a>
        </div>
      </div>
      <hr className="container text-center mt-4" />
      <div className="container text-center mt-4">
        <p>
          © <span>Copyright</span> 
          <strong className="px-1">Our School</strong> 
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/" className="text-blue-500 hover:underline">BootstrapMade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
