import { sessionService } from '@/lib/auth/session'
import { axiosBackendInstance } from '@/lib/axiosInstance'
import { envHelper } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TLoginResponse } from './auth.interfaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  try {
    const response: TLoginResponse = await axiosBackendInstance.post('/login', {
      username,
      password,
    })

    envHelper()
    console.log('_____ SERVER: login.ts - response', response)

    // Login failed
    if ('code' in response) {
      console.log('_____ SERVER: login.ts - login failed')
      res.status(401).json({ code: response.code, message: response.message })
      return
    }

    // Login success
    if ('data' in response) {
      console.log('_____ SERVER: login.ts - login success')
      const { access_token, expires_in, token_type } = response.data
      if (access_token && token_type && expires_in) {
        await sessionService.createSession(
          {
            username,
            accessToken: access_token,
            tokenType: token_type,
            expiresIn: expires_in,
          },
          res
        )
        console.log('_____ SERVER: login.ts - login success: ', response.data)
        res.status(200).json({ success: true, data: response.data })
        return
      }
    }

    res.status(500).json({ message: 'Unexpected response format' })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
