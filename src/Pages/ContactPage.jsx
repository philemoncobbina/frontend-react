import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/Templates/Navbar';
import Footer from '@/Templates/Footer';
import ContactHero from '@/layouts/Contact/ContactHero';
import Contact from '@/layouts/Contact/Contact';
import WorkHours from '@/layouts/Contact/WorkHours';

const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with Ridoana for inquiries, support, and more. Find our contact details and working hours here." />
      </Helmet>
      <Navbar />
      <ContactHero />
      <Contact />
      <WorkHours />
      <Footer />
    </div>
  );
};

export default ContactPage;
