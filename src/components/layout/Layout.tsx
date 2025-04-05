import NavBar from '@/components/NavBar/NavBar'
import { ReactNode } from 'react'
interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className="container py-5">{children}</div>
    </>
  )
}
