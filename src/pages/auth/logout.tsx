import { useAuth } from '@/lib/auth/authContext'
import { axiosFrontendInstance } from '@/lib/axiosInstance'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// petstast: page is not necessary, could be just function handleLogout in NavBar, but I like this to have URL
export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    logout()
    router.push('/')
  }, [logout, router])

  return (
    <div className="container py-5">
      <p>Logging out...</p>
    </div>
  )
}

// Optional: Redirect if not logged in (though not strictly necessary here)
export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context

  try {
    const sessionResponse = await axiosFrontendInstance.get('/api/auth/session', {
      headers: {
        Cookie: req.headers.cookie ?? '',
      },
    })
    const sessionData = sessionResponse.data

    if (!sessionData.username) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      }
    }

    return { props: {} }
  } catch (error) {
    console.error('Error checking session:', error)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
}
