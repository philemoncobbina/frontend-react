import React from 'react';

const WhyWorkWithUs = () => {
  const benefits = [
    {
      title: "Supportive Community",
      description: "Join a collaborative environment where educators support each other and grow together.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Professional Development",
      description: "Access continuous learning opportunities and career advancement pathways.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Work-Life Balance",
      description: "Enjoy flexible schedules and policies that respect your personal time and wellbeing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Make a Difference",
      description: "Shape the future by directly impacting the lives and education of our students.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  return (
    <section id='working-with-us-section' className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Work With Us</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our passionate team of educators and staff dedicated to creating an exceptional learning environment for our students.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-indigo-600">
              <img 
                src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Teacher in classroom" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
              <svg className="h-10 w-10 text-indigo-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-lg text-gray-600 italic mb-6">
                "Working at this school has been the most rewarding experience of my career. The supportive administration and collaborative culture make it a joy to come to work every day. I've grown tremendously as an educator and as a person."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Sarah Johnson</p>
                <p className="text-gray-500">Science Teacher, 5 years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
        <a href="/careers/vacancy">
  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
    View Open Positions
  </button>
</a>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;