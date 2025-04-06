import { axiosFrontendInstance } from '@/lib/axiosInstance'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextType {
  username: string | null
  setUsername: (username: string | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosFrontendInstance.get('/api/auth/session')
        setUsername(response.data?.username || null)
      } catch (error) {
        console.error('___ authContext: error fetching session:', error)
        setUsername(null)
      }
    }
    fetchSession()
  }, [])

  const logout = async () => {
    try {
      await axiosFrontendInstance.post('/api/auth/logout')
      setUsername(null)
    } catch (error) {
      console.error('Logout failed:', error)
      setUsername(null)
    }
  }

  const value = useMemo(
    () => ({
      username,
      setUsername,
      logout,
    }),
    [username]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}
