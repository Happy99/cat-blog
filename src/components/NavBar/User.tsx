import { axiosBackendInstance } from '@/lib/axiosInstance'
import { useEffect, useState } from 'react'

const UserProfile = () => {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosBackendInstance.get('/api/auth/session')
        setUsername(response.data.username)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSession()
  }, [])

  return username && <p>{username}</p>
}

export default UserProfile
