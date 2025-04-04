'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

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
          {/* //TODO: could be array in the future, now readability is fine and YAGNI practice */}
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

          {/* //TODO: login btn could be outside once its collapsed, or moved to the first position at least */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-primary d-flex align-items-center" href="/auth/login">
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
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
