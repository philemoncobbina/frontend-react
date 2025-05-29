import React from 'react'
import { Helmet } from 'react-helmet-async'
import DashboardSection from '@/layouts/DashBoard/DashboardSection'
import Navbar from '@/Templates/Navbar'
import DashboardTable from '@/layouts/DashBoard/DashboardTable'

const DashboardPage = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      
      <Navbar />
      <DashboardSection />
      <DashboardTable />
    </div>
  )
}

export default DashboardPage