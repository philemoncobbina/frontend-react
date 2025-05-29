import React from 'react';

const AdmissionNote = () => {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-gray-50 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column (Heading & Description) */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Welcome to Ridoana Admissions: Your Journey Starts Here
              </h1>
              <p className="text-gray-700 leading-relaxed">
              Thank you for considering RIDOANA! We're thrilled that you're exploring our school. This Admissions section is designed to help you navigate the application process while also offering insights into what makes AIS a great place for your child.
              </p>
            </div>
            {/* Right Column (Additional Info) */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="mb-6 text-gray-700 leading-relaxed">
              At AIS, we aim to make the enrollment process as smooth and informative as possible. We recognize that selecting the right school for your child is a big decision, and we’re here to support you throughout the journey.
              </p>
              <p className="text-gray-700 leading-relaxed">
              Our dedicated Admissions team is always available to answer your questions, provide detailed information about our programs, and assist you with the application process. We also invite you to take a virtual tour of AIS to get a closer look at our campus and community.
              </p>
            </div>
          </div>
          {/* Optional Image or Decorative Element */}
          
        </div>
      </div>
    </section>
  );
};

export default AdmissionNote;
