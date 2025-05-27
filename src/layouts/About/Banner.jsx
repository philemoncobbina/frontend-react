import React from 'react';

const Banner = () => (
  <section className="bg-gradient-to-r from-gray-900 to-gray-800 mb-6 rounded-lg mx-auto max-w-screen-xl py-4">
    <div className="container px-4 mx-auto">
      <div className="relative py-12 px-8 md:px-16 rounded-lg overflow-hidden">
        {/* Abstract decorative elements instead of external images */}
        <div className="absolute z-10 left-4 top-4 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="2" fill="#a855f7" />
            <circle cx="25" cy="10" r="2" fill="#a855f7" />
            <circle cx="40" cy="10" r="2" fill="#a855f7" />
            <circle cx="10" cy="25" r="2" fill="#a855f7" />
            <circle cx="25" cy="25" r="2" fill="#a855f7" />
            <circle cx="40" cy="25" r="2" fill="#a855f7" />
            <circle cx="10" cy="40" r="2" fill="#a855f7" />
            <circle cx="25" cy="40" r="2" fill="#a855f7" />
            <circle cx="40" cy="40" r="2" fill="#a855f7" />
          </svg>
        </div>
        
        <div className="absolute z-10 right-4 bottom-4 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="2" fill="#a855f7" />
            <circle cx="75" cy="60" r="2" fill="#a855f7" />
            <circle cx="90" cy="60" r="2" fill="#a855f7" />
            <circle cx="60" cy="75" r="2" fill="#a855f7" />
            <circle cx="75" cy="75" r="2" fill="#a855f7" />
            <circle cx="90" cy="75" r="2" fill="#a855f7" />
            <circle cx="60" cy="90" r="2" fill="#a855f7" />
            <circle cx="75" cy="90" r="2" fill="#a855f7" />
            <circle cx="90" cy="90" r="2" fill="#a855f7" />
          </svg>
        </div>
        
        {/* Modern wave background */}
        <div className="absolute left-0 right-0 top-0 bottom-0 opacity-10">
          <svg 
            viewBox="0 0 1000 300" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none" 
            className="h-full w-full object-cover"
          >
            <path 
              d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,229.3C960,224,1056,160,1152,117.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="#a855f7" 
              fillOpacity="0.5"
            />
            <path 
              d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,133.3C672,149,768,203,864,192C960,181,1056,107,1152,80C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="#8b5cf6" 
              fillOpacity="0.3"
            />
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-wrap items-center -m-3">
          <div className="w-full md:w-1/2 p-3">
            <h2 className="mb-6 text-3xl text-white font-bold tracking-tighter">
              Empowering students to achieve their full potential through a well-rounded education
            </h2>
            <ul className="flex flex-wrap">
              {/* Custom checkmarks instead of external images */}
              {['Supportive Community', 'Excellent Academics', 'State-of-the-Art Facilities'].map((item, index) => (
                <li key={index} className="flex items-center mr-6 mb-2 text-sm text-gray-200 font-semibold">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 rounded-full bg-purple-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </span>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-3">
            <a href="/admission" className="block md:ml-auto px-7 py-4 font-medium text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-md text-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Banner;