const CoreValuesSection = () => {
    const values = [
      {
        title: "Student-Centered Approach",
        description: "Placing learners at the heart of every decision, fostering individual growth and personalized educational journeys.",
        icon: "🎯",
        color: "bg-purple-100"
      },
      {
        title: "Academic Excellence",
        description: "Maintaining rigorous standards while encouraging intellectual curiosity and lifelong learning habits.",
        icon: "🏆",
        color: "bg-blue-100"
      },
      {
        title: "Collaborative Environment",
        description: "Promoting teamwork among staff, students, and parents to create a supportive educational ecosystem.",
        icon: "🤝",
        color: "bg-green-100"
      },
      {
        title: "Innovative Teaching",
        description: "Embracing cutting-edge pedagogies and technology to enhance learning experiences.",
        icon: "💡",
        color: "bg-yellow-100"
      },
      {
        title: "Community Engagement",
        description: "Building strong partnerships with local organizations for real-world learning opportunities.",
        icon: "🌍",
        color: "bg-pink-100"
      },
      {
        title: "Ethical Foundation",
        description: "Cultivating integrity, respect, and social responsibility in all aspects of school life.",
        icon: "⚖️",
        color: "bg-orange-100"
      }
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The foundation of our educational community and workplace culture
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl ${value.color}`}
            >
              <div className="mb-6">
                <span className="text-5xl transition-transform duration-300 group-hover:rotate-12">
                  {value.icon}
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
  
              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
  
        {/* Decorative Elements */}
        <div className="hidden lg:block">
          <div className="absolute left-0 -mt-24 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply opacity-30"></div>
          <div className="absolute right-0 -mt-12 w-24 h-24 bg-yellow-100 rounded-full mix-blend-multiply opacity-30"></div>
        </div>
      </div>
    );
  };
  
  export default CoreValuesSection;