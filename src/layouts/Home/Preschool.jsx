import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Preschool = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Section Header with animated underline - similar style to AboutSection */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Our <span className="text-blue-600 dark:text-blue-400">Preschool</span> Program
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Where young minds begin their educational journey in a nurturing and stimulating environment.
          </p>
        </div>

        {/* Main content section */}
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100/80 to-transparent dark:from-blue-900/20 dark:to-transparent z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row-reverse items-center p-6 md:p-0">
            {/* Image section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative rounded-xl overflow-hidden transform rotate-1 shadow-2xl m-6 md:m-10">
                <div className="absolute inset-0 bg-blue-600/10 z-10"></div>
                <img
                  src="https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Preschool Children Learning"
                  className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                />
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
              </div>
            </motion.div>
            
            {/* Content section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 flex flex-col justify-center p-6 md:p-12"
            >
              <div className="mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium text-sm mb-4">
                  Ages 2-5 Years
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                  Ridoana <span className="text-blue-600 dark:text-blue-400">Preschool Section</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  At Ridoana Preschool, we create a foundation for lifelong learning through play-based activities, age-appropriate academics, and social development. Our curriculum is designed to nurture curiosity, creativity, and confidence in every child.
                </p>
                
                {/* Feature points */}
                <div className="space-y-3 mb-8">
                  {[
                    "Child-centered learning approach",
                    "Qualified and caring teachers",
                    "Safe and stimulating environment",
                    "Regular parent communication"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <a 
                  href="/admission" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group"
                >
                  Enrol Now
                  <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default Preschool;