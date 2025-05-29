import React from 'react';
import VacancyHero from '@/layouts/Career/VacancyHero';
import Navbar from '@/Templates/Navbar';
import JobOpeningsSection from '@/layouts/Career/JobOpeningsSection';
import Footer from '@/Templates/Footer';

const JobVacancyPage = () => {
  return (
    <>
      <Navbar />
      <VacancyHero />
      <JobOpeningsSection />
      <Footer />
    </>
  );
}

export default JobVacancyPage;
