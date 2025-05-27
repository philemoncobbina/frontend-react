import React from 'react';


const VacancyHero = () => {
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
      <a href="/" className="hover:text-blue-800">Home</a> &gt; 
      <a href="/careers" className="hover:text-blue-800">Career</a> &gt; 
      <span className="text-gray-600">Vacancy</span>
    </div>
  </div>
</div>
      
      {/* Hero Section with Background Image */}
      <div 
        className="w-full py-16 overflow-hidden bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          filter: 'brightness(90%)',
        }}
      >
        <div className="container mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
          Join Our Team!
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6 leading-relaxed">
          Passionate about education? We're seeking dedicated individuals to inspire young minds and make a difference. Explore career opportunities with us today!
          </p>
          
          
        </div>
      </div>
    </div>
  );
};

export default VacancyHero;