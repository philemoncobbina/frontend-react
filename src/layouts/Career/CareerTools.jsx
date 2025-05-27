import React from 'react';

// Function to handle scroll to "Working with Us" (if needed)
const scrollToWorkingWithUs = () => {
  const workingSection = document.getElementById('working-with-us-section');
  if (workingSection) {
    workingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to handle scroll to "Our Teams" (if needed)
const scrollToOurTeams = () => {
  const teamsSection = document.getElementById('our-teams-section');
  if (teamsSection) {
    teamsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const CareerTools = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div style={{ marginTop: '5.9rem' }} className="w-full py-3">
        <div className="container mx-auto px-6">
          <div className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-800">Home</a> &gt; <span className="text-gray-800">Careers</span>
          </div>
        </div>
      </div>

      {/* CareerTools Component */}
      <div className="relative py-16 bg-gray-900 text-white  flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5212348/pexels-photo-5212348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>

        {/* Content Wrapper */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-8">
          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Together, all the way</h1>
            <p className="text-lg mb-1">
              We're a global leader in container trade and logistics. And we're embarking on an industry-defining transformation that will change the way the world moves. It's a big moment for all of us – and we all have our part to play. Are you ready?
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto">
            {/* Working with us (updated as div, no longer a link) */}
            <div
              className="text-white overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
              onClick={scrollToWorkingWithUs} // onClick for scrolling
            >
              <div className="relative p-8">
                <img
                  src="https://www.maersk.com/~/media_sc9/maersk/shared-files/icons/negative/working-with-us_pictogram_v4.svg"
                  alt="Working with us"
                  className="w-24 h-24 object-contain mx-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="text-white font-semibold">Why work with us?</span>
                </div>
              </div>
            </div>

            {/* Our teams (updated as div, no longer a link) */}
            <div
              className="text-white overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
              onClick={scrollToOurTeams} // onClick for scrolling
            >
              <div className="relative p-8">
                <img
                  src="https://www.maersk.com/~/media_sc9/maersk/shared-files/icons/negative/our_teams_pictogram_v2.svg"
                  alt="Our teams"
                  className="w-24 h-24 object-contain mx-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="text-white font-semibold">Work Force Structure</span>
                </div>
              </div>
            </div>

            {/* Vacancies (updated as div, no longer a link) */}
            <a href="/careers/vacancy">
              <div className="text-white overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer">
                <div className="relative p-8">
                  <img
                    src="https://www.maersk.com/~/media_sc9/maersk/shared-files/icons/negative/vacancies-career-landing-page_pictogram.svg"
                    alt="Vacancies"
                    className="w-24 h-24 object-contain mx-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="text-white font-semibold">Vacancies</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerTools;