import React from 'react';

const CallToAction = () => {
  return (
    <section id="about" className="bg-gray-100 items-center mx-auto dark:bg-gray-800 ">
      <div className="container mx-auto">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Welcome to [School Name] - Nurturing Future Leaders.
                </h2>
                <p className="mb-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  At [School Name], we are committed to fostering academic excellence, personal growth, and community involvement. Our approach integrates innovation with tradition, ensuring each student has the opportunity to thrive in a dynamic learning environment.
                  <br /><br />
                  We believe in empowering our students to become well-rounded individuals, equipped with the skills and values to succeed both in school and in life. Join us on a journey of discovery, achievement, and inspiration.
                </p>
                <a href="/about" className="inline-block rounded-md border border-transparent bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-blue-700">
                  Learn More About Us
                </a>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 ">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 ">
                  <div className="relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]">
                    <img
                      alt="school campus"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                      sizes="100vw"
                      src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                  </div>
                </div>
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div className="relative mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]">
                    <img
                      alt="school students"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center hidden sm:block"
                      sizes="100vw"
                      src="https://images.pexels.com/photos/5428155/pexels-photo-5428155.jpeg"
                    />
                  </div>
                  <div className="relative z-10 mb-4 flex items-center justify-center overflow-hidden bg-gray-900 px-6 py-12 sm:mb-8 sm:h-[160px] sm:p-5 lg:mb-4 xl:mb-8">
                    <div>
                      <span className="block text-5xl font-extrabold text-white">30+</span>
                      <span className="block text-base font-semibold text-white">Years of Educational Excellence</span>
                      <span className="block text-base font-medium text-white text-opacity-70">Inspiring Students to Reach Their Full Potential</span>
                    </div>
                    <div>
                      <span className="absolute left-0 top-0 -z-10">
                        <svg width="106" height="144" viewBox="0 0 106 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.1" x="-67" y="47.127" width="113.378" height="131.304" transform="rotate(-42.8643 -67 47.127)" fill="url(#paint0_linear_1416_214)"></rect>
                          <defs>
                            <linearGradient id="paint0_linear_1416_214" x1="-10.3111" y1="47.127" x2="-10.3111" y2="178.431" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white"></stop>
                              <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute right-0 top-0 -z-10">
                        <svg width="130" height="97" viewBox="0 0 130 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.1" x="0.867188" y="0.649902" width="113.378" height="131.304" transform="rotate(28.8381 0.867188 0.649902)" fill="url(#paint0_linear_1416_215)"></rect>
                          <defs>
                            <linearGradient id="paint0_linear_1416_215" x1="57.5559" y1="0.649902" x2="57.5559" y2="132.306" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white"></stop>
                              <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
