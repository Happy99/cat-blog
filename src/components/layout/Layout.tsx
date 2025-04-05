import NavBar from '@/components/NavBar/NavBar'
import { ReactNode } from 'react'
interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <div className="container py-5">{children}</div>
    </>
  )
}

export default Layout
