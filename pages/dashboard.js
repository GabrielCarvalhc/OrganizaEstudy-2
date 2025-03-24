// pages/dashboard.js
import Head from 'next/head'
import Navbar from '../components/Navbars'
import Dashboard from '../components/Dashboards'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - OrganizaEstudy</title>
        <meta name="description" content="Dashboard de estudos" />
      </Head>
      
      <Navbar />
      
      <main>
        <Dashboard />
      </main>
    </>
  )
}