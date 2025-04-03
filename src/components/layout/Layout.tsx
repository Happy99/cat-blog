import { ReactNode } from 'react'
import NavBar from '@/components/NavBar.tsx/NavBar'
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
