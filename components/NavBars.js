// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">OrganizaEstudy</Link>
        <div className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/">Matérias</Link>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          background: #2c3e50;
          color: white;
          padding: 1rem 0;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .nav-links a:hover {
          opacity: 0.8;
        }
        @media (max-width: 600px) {
          .container {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </nav>
  )
}