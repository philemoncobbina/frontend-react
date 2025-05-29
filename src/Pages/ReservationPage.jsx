import React from 'react'
import Reservation from '@/layouts/Reservation/Reservation'
import ReservationHero from '@/layouts/Reservation/ReservationHero'
import Navbar from '@/Templates/Navbar'
import Footer from '@/Templates/Footer';

const ReservationPage = () => {
  return (
    <div>
      <Navbar />
      <ReservationHero />
      <Reservation />
      <Footer />
    </div>
  )
}

export default ReservationPage
