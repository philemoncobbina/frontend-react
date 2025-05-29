import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutSection() {
  const carouselApiRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 3;

  // Function to start the automatic sliding
  const startAutoSlide = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    
    intervalIdRef.current = setInterval(() => {
      if (carouselApiRef.current && !isPaused) {
        carouselApiRef.current.scrollNext();
      }
    }, 5000);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isPaused) {
          startAutoSlide();
        } else {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPaused]);

  // Handle carousel change to update active index
  useEffect(() => {
    if (carouselApiRef.current) {
      carouselApiRef.current.on("select", () => {
        setActiveIndex(carouselApiRef.current.selectedScrollSnap());
      });
    }
  }, []);

  // Effect to restart the timer when pause state changes
  useEffect(() => {
    if (!isPaused && aboutSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAutoSlide();
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(aboutSectionRef.current);
      return () => {
        observer.disconnect();
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      };
    }
  }, [isPaused]);

  const values = [
    {
      title: "About Us",
      image: "https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our school is dedicated to providing a nurturing and challenging environment where students can thrive academically and personally. We strive to create a supportive community where every student is encouraged to reach their full potential."
    },
    {
      title: "Mission",
      image: "https://images.pexels.com/photos/7026054/pexels-photo-7026054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our mission is to foster a learning environment that emphasizes academic excellence, personal growth, and social responsibility. We aim to equip students with the knowledge and skills necessary to excel in their future endeavors and contribute positively to society."
    },
    {
      title: "Vision",
      image: "https://images.pexels.com/photos/8617582/pexels-photo-8617582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Our vision is to be a leading educational institution recognized for excellence in teaching, innovation, and student success. We aspire to inspire a lifelong love of learning and prepare our students to be future leaders and global citizens."
    }
  ];

  return (
    <section ref={aboutSectionRef} className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header with animated underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Discover Our <span className="text-blue-600 dark:text-blue-400">Core Values</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-6"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Learn more about our commitment to excellence in education and our vision for shaping future leaders.
          </p>
        </div>

        {/* Main carousel with beautiful card design */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel 
            setApi={(api) => carouselApiRef.current = api} 
            className="w-full"
            opts={{
              loop: true,
              align: "center"
            }}
          >
            <CarouselContent>
              {values.map((value, index) => (
                <CarouselItem 
                  key={index} 
                  className="md:basis-4/5 lg:basis-3/4"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl">
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-1/2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
                          <img
                            src={value.image}
                            alt={value.title}
                            className="w-full h-64 md:h-full object-cover transform transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden">
                            <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                          </div>
                        </div>
                        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 hidden md:block">{value.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                          <button className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
                            Learn more
                            <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom navigation buttons */}
            <div className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10">
              <CarouselPrevious className="bg-white dark:bg-gray-800 border-none shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white size-12 rounded-full">
                <ChevronLeft className="size-6" />
              </CarouselPrevious>
            </div>
            <div className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10">
              <CarouselNext className="bg-white dark:bg-gray-800 border-none shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white size-12 rounded-full">
                <ChevronRight className="size-6" />
              </CarouselNext>
            </div>
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (carouselApiRef.current) {
                    carouselApiRef.current.scrollTo(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? "bg-blue-600 w-8" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}