const WorkforceSection = () => {
  const departments = [
    {
      title: "Teaching Staff",
      description: [
        "- Certified educators with advanced degrees in their respective fields, participating in ongoing professional development",
        "- Implementation of innovative teaching methodologies including project-based learning and flipped classroom models",
        "- Regular student assessments and personalized learning plans to ensure academic growth for all students"
      ],
      icon: "👩🏫",
      image: "url('https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
    },
    {
      title: "Administration",
      description: [
        "- Comprehensive management of daily school operations including budgeting and resource allocation",
        "- Coordination of student enrollment processes and maintenance of academic records using digital management systems",
        "- Organization of school events and liaison with parent-teacher associations for community engagement"
      ],
      icon: "📋",
      image: "url('https://images.pexels.com/photos/5415447/pexels-photo-5415447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
    },
    {
      title: "Support Staff",
      description: [
        "- 24/7 campus security and maintenance of state-of-the-art educational facilities and equipment",
        "- Management of transportation logistics including GPS-tracked school buses and safety protocols",
        "- Technical support for smart classrooms and IT infrastructure maintenance for seamless digital learning"
      ],
      icon: "🛠️",
      image: "url('https://images.pexels.com/photos/6195277/pexels-photo-6195277.jpeg?auto=compress&cs=tinysrgb&w=600')"
    },
    {
      title: "Counseling",
      description: [
        "- Comprehensive career assessment programs using psychometric testing and AI-driven aptitude analysis",
        "- Mental health support services including individual counseling sessions and stress management workshops",
        "- University admission guidance with scholarship assistance and application portfolio development"
      ],
      icon: "💬",
      image: "url('https://images.pexels.com/photos/7579306/pexels-photo-7579306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
    }
  ];

  return (
    <div id="our-teams-section" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Workforce Structure
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <div 
            key={index}
            className="group relative h-96 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-102 cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: dept.image }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Department Name */}
              <div className="absolute bottom-0 left-0 p-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{dept.icon}</span>
                  <h3 className="text-2xl font-semibold text-white">{dept.title}</h3>
                </div>
              </div>

              {/* Animated Description */}
              <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center bg-black/70">
                <ul className="text-white space-y-4 text-base leading-relaxed w-full">
                  {dept.description.map((point, i) => (
                    <li 
                      key={i}
                      className="flex items-start transform transition-all duration-500 
                        opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0"
                      style={{ transitionDelay: `${i * 100 + 100}ms` }}
                    >
                      <span className="mr-2 text-xl">▹</span>
                      <span className="mt-0.5">{point.replace('-', '').trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkforceSection;