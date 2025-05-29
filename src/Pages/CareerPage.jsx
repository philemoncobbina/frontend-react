import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '@/Templates/Navbar'
import CareerTools from '@/layouts/Career/CareerTools'
import WorkforceSection from '@/layouts/Career/WorkforceSection'
import CoreValuesSection from '@/layouts/Career/CoreValuesSection'
import WhyWorkWithUs from '@/layouts/Career/WhyWorkWithUs'
import Footer from '@/Templates/Footer'

const CareerPage = () => {
  return (
    <>
      <Helmet>
        <title>Career</title>
        <meta name="description" content="Explore career opportunities and our company values" />
      </Helmet>
      
      <Navbar />
      <CareerTools />
      <CoreValuesSection />
      <WorkforceSection />
      <WhyWorkWithUs />
      <Footer />
    </>
  )
}

export default CareerPage