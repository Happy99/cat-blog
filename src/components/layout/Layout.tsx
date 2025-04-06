import NavBar from '@/components/NavBar/NavBar'
import { AuthProvider } from '@/lib/auth/authContext'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AuthProvider>
      <NavBar />
      <div className="container py-5">{children}</div>
    </AuthProvider>
  )
}

export default Layout
