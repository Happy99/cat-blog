'use client'

import { axiosFrontendInstance } from '@/lib/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NavBar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosFrontendInstance.get('/api/auth/session')
        console.log('NavBar - session response:', response.data)
        setUsername(response.data.username || null)
      } catch (error) {
        console.error('Error fetching session:', error)
        setUsername(null)
      }
    }
    getUser()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <Image src={'/logo.png'} alt="logo" width={30} height={30} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/articles') ? 'active' : ''}`}
                href="/articles"
              >
                Recent articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} href="/about">
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {username ? (
              <li className="nav-item">
                <span className="nav-link">{username}</span>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link text-primary d-flex align-items-center"
                  href="/auth/login"
                >
                  Log In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right ms-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
