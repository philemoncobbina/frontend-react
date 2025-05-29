import React from 'react';

const AboutHistory = () => {
  return (
    <section id="about-history-section" className="relative py-8 sm:py-12 lg:py-16 bg-gray-50 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column (Heading & Description) */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Our School's Rich History
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Founded in [Year], [Your School Name] has been a pillar of education and community for generations. From our humble beginnings in a small classroom to our present-day campus, we've nurtured curious minds, fostered creativity, and instilled values that last a lifetime.
              </p>
            </div>
            {/* Right Column (Additional Info) */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="mb-6 text-gray-700 leading-relaxed">
                Our alumni have gone on to achieve remarkable success in various fields, from academia to the arts, from technology to public service. We take pride in our legacy and continue to inspire future leaders.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Necessitatibus sunt atque deleniti quia, dignissimos rerum voluptatum pariatur odit ipsum sapiente dolore consectetur voluptatibus quae aliquam architecto voluptate voluptatem alias reprehenderit. Turpis turpis in justo pellentesque id nibh praesent.
              </p>
            </div>
          </div>
          {/* Optional Image or Decorative Element */}
                   
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;