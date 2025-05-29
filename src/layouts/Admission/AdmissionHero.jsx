import React from 'react';

const AdmissionHero = () => {
  const scrollToHistory = () => {
    const historySection = document.getElementById('about-history-section');
    if (historySection) {
      historySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTeam = () => {
    const teamSection = document.getElementById('about-team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-24 mb-0">
      {/* Optional Breadcrumb Navigation */}
      <div className="w-full py-3">
        <div className="container mx-auto px-6">
          <div className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-800">Home</a> &gt; <span className="text-gray-800">Admission</span>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Background Image */}
      <div 
        className="w-full py-16 overflow-hidden bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/5427671/pexels-photo-5427671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          filter: 'brightness(90%)',
        }}
      >
        <div className="container mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Apply To Ridoana
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6 leading-relaxed">
           Our institution is dedicated to fostering academic excellence, personal growth, and a welcoming environment for every student. 
          </p>
          
          {/* Responsive Button with Hover Effect */}
          <div className="sm:space-x-4 space-y-3 sm:space-y-0">
  <a href="/admission/apply" className="block sm:inline-block w-full sm:w-auto">
    <button className="bg-white px-6 py-3 rounded shadow text-gray-700 font-medium hover:bg-gray-100 hover:scale-105 transition duration-300 w-full sm:w-auto">
      Apply Online
    </button>
  </a>
</div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionHero;