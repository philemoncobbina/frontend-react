import React, { useState } from 'react';
import { submitContactForm } from "../../Services/ContactService";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, X, Loader2 } from 'lucide-react';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    setAgreeToPolicy(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToPolicy) {
      setErrorMessage("Please agree to our privacy policy to proceed.");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");

    try {
      await submitContactForm(formData);
      setIsAlertOpen(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      setAgreeToPolicy(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setErrorMessage("There was an error submitting your form. Please try again.");
      setIsLoading(false);
    }
  };

  return {
    formData,
    isAlertOpen,
    isLoading,
    errorMessage,
    agreeToPolicy,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    setIsAlertOpen,
  };
};

const ContactSection = () => {
  const {
    formData,
    isAlertOpen,
    isLoading,
    errorMessage,
    agreeToPolicy,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    setIsAlertOpen,
  } = useContactForm();

  const inputClasses = "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200";
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with animated underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Contact Information Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-5/12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="h-full relative overflow-hidden">
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 z-0"></div>
                
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300">Reach out to us through any of these channels.</p>
                  </div>
                  
                  {/* Contact details with icons */}
                  <div className="space-y-8 mb-auto">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300">4140 Parker Rd. Allentown, New Mexico 31134</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h4>
                        <a 
                          href="tel:+2334590737" 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          +233 45 90737
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h4>
                        <a 
                          href="mailto:hello@yourdomain.com" 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          hello@yourdomain.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technical support card */}
                  <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.29 7 12 12 20.71 7"></polyline>
                          <line x1="12" y1="22" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 dark:text-white">Technical Help Desk</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 mb-4">Need technical assistance? Our support team is ready to help.</p>
                        <a 
                          href="/contact/raiseticket" 
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 group"
                        >
                          <span>Raise A Ticket</span>
                          <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-7/12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Send Us a Message</h3>
                    <p className="text-gray-600 dark:text-gray-300">Fill out the form below to connect with a member of our team.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="John"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="+233 45 90737"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className={inputClasses}
                      placeholder="How can we help you today?"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Error message */}
                  {errorMessage && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-600 dark:text-red-400 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorMessage}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agree"
                        type="checkbox"
                        checked={agreeToPolicy}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <label htmlFor="agree" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                      I agree to your <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">privacy policy</a>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg transition-colors disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {isAlertOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Message Sent Successfully
                </h3>
                <button 
                  onClick={() => setIsAlertOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                <p className="text-green-800 dark:text-green-200">
                  Thank you for reaching out! We've received your message and will get back to you as soon as possible.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAlertOpen(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;