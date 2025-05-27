import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/Templates/Navbar';
import Footer from '@/Templates/Footer';
import AdmissionHero from '@/layouts/Admission/AdmissionHero';
import AdmissionNote from '@/layouts/Admission/AdmissionNote';
import AdmissionTools from '@/layouts/Admission/AdmissionTools';

const AdmissionPage = () => {
  return (
    <>
      <Helmet>
        <title>Admission</title>
        <meta name="description" content="Apply for admission to Ridoana and explore the admission tools and notes." />
      </Helmet>
      <Navbar />
      <AdmissionHero />
      <AdmissionNote />
      <AdmissionTools />
      <Footer />
    </>
  );
};

export default AdmissionPage;
