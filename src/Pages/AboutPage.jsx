import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutHero from '@/layouts/About/AboutHero';
import Navbar from '@/Templates/Navbar';
import AboutHistory from '@/layouts/About/AboutHistory';
import TeamSection from '@/layouts/About/TeamSection';
import Banner from '@/layouts/About/Banner';
import Footer from '@/Templates/Footer';
import ValuesSection from '@/layouts/About/ValuesSection';

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="Learn more about Ridoana, our team, history, and values." />
      </Helmet>
      <Navbar />
      <AboutHero />
      <AboutHistory />
      <ValuesSection />
      <TeamSection />
      <Banner />
      <Footer />
    </div>
  );
};

export default AboutPage;
