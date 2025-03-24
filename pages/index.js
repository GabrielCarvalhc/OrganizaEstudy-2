// pages/index.js
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/NavBars'
import MateriaForm from '../components/MateriaForm'
import MateriaList from '../components/MateriaList'

export default function Home() {
  const [refreshList, setRefreshList] = useState(false)

  const handleAddMateria = () => {
    setRefreshList(prev => !prev)
  }

  return (
    <>
      <Head>
        <title>OrganizaEstudy - Organize seus estudos</title>
        <meta name="description" content="Aplicação para organização de estudos" />
      </Head>
      
      <Navbar />
      
      <main>
        <MateriaForm onAdd={handleAddMateria} />
        <MateriaList key={refreshList} />
      </main>
      
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: #f5f7fa;
          color: #34495e;
          line-height: 1.6;
        }
        main {
          padding: 1rem 0;
          min-height: calc(100vh - 72px);
        }
        h1, h2, h3 {
          color: #2c3e50;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}