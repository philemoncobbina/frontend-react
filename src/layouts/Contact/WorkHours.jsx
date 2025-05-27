import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CalendarDays, ArrowRight } from 'lucide-react';

const WorkHours = () => {
  const hoursSections = [
    {
      title: "Student School Hours",
      icon: <Clock />,
      hours: [
        "Monday – Thursday: 8:15 am – 2:50 pm",
        "Friday: 8:15 am – 1:00 pm"
      ],
      color: "blue"
    },
    {
      title: "Regular Office Hours",
      icon: <Calendar />,
      hours: [
        "Monday – Thursday: 7:45 am – 3:30 pm",
        "Friday: 7:45 am – 2:00 pm"
      ],
      color: "indigo"
    },
    {
      title: "Summer Office Hours",
      icon: <CalendarDays />,
      hours: [
        "Tuesday – Thursday: 10:00 am – 1:00 pm",
        "Closed on National and State Holidays"
      ],
      color: "purple"
    }
  ];

  const getGradientClass = (color) => {
    const gradients = {
      blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800",
      indigo: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800",
      purple: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800"
    };
    return gradients[color] || gradients.blue;
  };

  const getIconBgClass = (color) => {
    const backgrounds = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
    };
    return backgrounds[color] || backgrounds.blue;
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container max-w-screen-lg mx-auto px-4">
        {/* Section Header with animated underline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            School <span className="text-blue-600 dark:text-blue-400">Hours</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Our dedicated hours of operation to serve students and parents
          </p>
        </div>
        
        {/* Hours cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {hoursSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden shadow-lg border bg-gradient-to-br ${getGradientClass(section.color)}`}
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${getIconBgClass(section.color)}`}>
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.hours.map((hourText, idx) => (
                    <p key={idx} className="text-center text-gray-600 dark:text-gray-300">
                      {hourText}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/contact/reservation"
            className="group flex items-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="mr-2">Schedule a Visit to Our Campus</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkHours;