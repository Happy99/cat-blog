import { sessionService } from '@/lib/auth/sessionService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('_____ SERVER: session.ts - envHelper', envHelper())
    console.log('_____ SERVER: session.ts - START')

    const sessionData = await sessionService.verifySession(req)
    console.log('_____ SERVER: session.ts - sessionData', sessionData)

    if (!sessionData) {
      res.setHeader('Set-Cookie', 'session=; HttpOnly; Secure; Path=/; Max-Age=0')
      console.log('_***** TTTTTTT____ SERVER: session.ts - sessionData is null')
      res.status(401).json({ username: null, error: 'Invalid or no session' })
      return
    }

    res.status(200).json({
      username: sessionData?.username,
      // accessToken: sessionData.accessToken,
      // tokenType: sessionData.tokenType,
      // expiresIn: sessionData.expiresIn,
    })
  } catch (error) {
    console.error('Error retrieving session:', error)
    res.status(500).json({ username: null, error: 'Internal server error' })
  }
}
