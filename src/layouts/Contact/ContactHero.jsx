import React from 'react';

const ContactHero = () => {
  

  return (
    <div className="mt-24 mb-0">
      {/* Optional Breadcrumb Navigation */}
      <div className="w-full py-3">
        <div className="container mx-auto px-6">
          <div className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-800">Home</a> &gt; <span className="text-gray-800">Contact Us</span>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Background Image */}
      <div 
        className="w-full py-16 overflow-hidden bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3231359/pexels-photo-3231359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          filter: 'brightness(90%)',
        }}
      >
        <div className="container mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
          Get in Touch
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6 leading-relaxed">
          We’d love to hear from you! Whether you have questions, need more information, or want to visit our campus, our team is here to help. Reach out to us today—we’re excited to connect with you!
          </p>
          <div className="sm:space-x-4 space-y-3 sm:space-y-0">
  <a href="/contact/reservation" className="block sm:inline-block w-full sm:w-auto">
    <button className="bg-white px-6 py-3 rounded shadow text-gray-700 font-medium hover:bg-gray-100 hover:scale-105 transition duration-300 w-full sm:w-auto">
    Schedule A Meeting
    </button>
  </a>
</div>
          
          

        </div>
      </div>
    </div>
  );
};

export default ContactHero;
