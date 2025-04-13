import 'server-only'

import { SessionPayload } from '@/lib/definitions'
import { envHelper } from '@/utils/utils'
import { SignJWT, jwtVerify } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { cache } from 'react'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

const encrypt = async (payload: SessionPayload) => {
  console.log('____ SERVER sessionService: encrypt - ENV HELPER')
  envHelper()

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

const decrypt = async (session: string | undefined = '') => {
  console.log('____ SERVER sessionService: decrypt - ENV HELPER')
  envHelper()

  if (!session) return null

  try {
    console.log('____ SERVER sessionService: decrypt - MAYBE EMPTY SESSION - session: ', session)
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session:', error)
    return null
  }
}

const createSession = async (
  { username, accessToken, tokenType, expiresIn }: SessionPayload,
  res: NextApiResponse
) => {
  console.log('____ SERVER sessionService: createSession - ENV HELPER')
  envHelper()

  const expiresAt = new Date(Date.now() + expiresIn * 1000) // APPLIFTING API returns 3600 secs
  console.log(
    '____ SESSION SERVICE: expiresAt',
    expiresAt.toLocaleString('en-GB', { timeZone: 'Europe/Prague', hour12: false })
  )
  const session = await encrypt({ username, accessToken, tokenType, expiresIn })

  res.setHeader(
    'Set-Cookie',
    `session=${session}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${expiresIn}; Expires=${expiresAt.toUTCString()}`
  )
}

const deleteSession = (res: NextApiResponse) => {
  console.log('____ SERVER sessionService: deleteSession - ENV HELPER')
  envHelper()

  res.setHeader('Set-Cookie', 'session=; HttpOnly; Secure; Path=/; Max-Age=0')
}

const verifySession = cache(async (req: NextApiRequest) => {
  console.log('____ SERVER sessionService: verifySession - ENV HELPER')
  envHelper()

  const session = req.cookies.session
  const sessionData = await decrypt(session)

  console.log('____ SERVER sessionService: verifySession - sessionData 1 555: ', sessionData)

  if (!sessionData?.username) {
    return null
  }

  console.log('____ SERVER sessionService: verifySession - sessionData 2 555: ', sessionData)

  return {
    isAuth: true,
    username: sessionData.username,
    accessToken: sessionData.accessToken,
    tokenType: sessionData.tokenType,
    expiresIn: sessionData.expiresIn,
  }
})

export const sessionService = {
  createSession,
  deleteSession,
  verifySession,
  decrypt,
  encrypt,
}
