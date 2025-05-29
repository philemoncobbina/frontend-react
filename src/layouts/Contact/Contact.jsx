import React from 'react';
import { useContactForm } from '@/layouts/Home/ContactSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, X, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ContactHero = () => {
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
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with animated underline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    rows="4"
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
                    I agree to our <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">privacy policy</a>
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
          
          {/* School Information Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* School Info */}
              <div className="p-8 relative">
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ridoana Comprehensive School</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    We are a community of learners. We will do whatever it takes to learn. We are building a strong foundation by believing we can, working our plan, then feeling the power of success!
                  </p>
                  
                  {/* Contact details with icons */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          2277 South 3000 East<br />
                          St George, Utah 84790
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h4>
                        <a 
                          href="tel:435-673-2232" 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          435-673-2232
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h4>
                        <a 
                          href="mailto:Philemoncobbina19@gmail.com" 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          Philemoncobbina19@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="flex-grow min-h-56 h-full relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.11934125465!2d-0.0317500242890023!3d5.695892432225657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf81d489b01b4d%3A0xba16fe638c0eb2c8!2sRidoana%20Comprehensive%20School!5e0!3m2!1sen!2sgh!4v1720828943519!5m2!1sen!2sgh" 
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Success Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button className="hidden"></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Message Sent Successfully
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
              Thank you for reaching out! We've received your message and will get back to you as soon as possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactHero;