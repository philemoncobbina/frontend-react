import React from 'react';
import { FaChalkboardTeacher, FaBookReader, FaHandsHelping, FaGraduationCap } from 'react-icons/fa';

const ValuesSection = () => {
  const values = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-blue-600" />,
      header: "Expert Faculty",
      paragraph: "Our faculty members are experts in their fields, dedicated to providing top-notch education and guidance to our students.",
    },
    {
      icon: <FaBookReader className="text-4xl text-green-600" />,
      header: "Innovative Learning",
      paragraph: "We embrace innovative teaching methods and technology to enhance the learning experience for all students.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-yellow-600" />,
      header: "Community Engagement",
      paragraph: "Our school actively participates in community service and encourages students to be socially responsible citizens.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-red-600" />,
      header: "Academic Excellence",
      paragraph: "We strive for academic excellence and provide a supportive environment to help students achieve their goals.",
    },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container px-4 mx-auto">
        {/* Section Header with decorative elements */}
        <div className="relative max-w-xl mx-auto mb-16 text-center">
          <div className="absolute left-0 right-0 -top-6 flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Our Founding Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide our educational approach and community
          </p>
        </div>
        
        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col h-full bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Decorative top border with icon's color */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                index === 0 ? "bg-blue-600" : 
                index === 1 ? "bg-green-600" : 
                index === 2 ? "bg-yellow-600" : "bg-red-600"
              }`}></div>
              
              {/* Icon with circle background */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300 mb-6">
                {value.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.header}</h3>
              <p className="text-gray-600 leading-relaxed">{value.paragraph}</p>
              
              {/* Decorative icon in the background */}
              <div className="absolute -right-6 -bottom-6 opacity-5 text-9xl">
                {value.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;