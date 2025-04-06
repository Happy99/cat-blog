import { sessionService } from '@/lib/auth/sessionService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = req.cookies.session
    console.log('_____ SERVER: session.ts - session', session)

    if (!session) {
      return res.status(200).json({ username: '' })
    }

    const sessionData = await sessionService.decrypt(session)

    if (!sessionData || !sessionData.username) {
      return res.status(200).json({ username: '' })
    }

    res.status(200).json({ username: sessionData.username })
  } catch (error) {
    console.error('Error retrieving session:', error)
    res.status(500).json({ username: '', error: 'Internal server error' })
  }
}
