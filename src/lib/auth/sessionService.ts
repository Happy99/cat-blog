import 'server-only'

import { SessionPayload } from '@/lib/definitions'
import { envHelper } from '@/utils/utils'
import { SignJWT, jwtVerify } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import { cache } from 'react'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

async function encrypt(payload: SessionPayload) {
  console.log('____ SERVER sessionService: encrypt: ', envHelper())

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

async function decrypt(session: string | undefined = '') {
  console.log('____ SERVER sessionService: decrypt: ', envHelper())

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session:', error)
    return null
  }
}

async function createSession(
  { username, accessToken, tokenType, expiresIn }: SessionPayload,
  res: NextApiResponse
) {
  console.log('____ SERVER sessionService: createSession: ', envHelper())

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

async function deleteSession(res: NextApiResponse) {
  console.log('____ SERVER sessionService: deleteSession: ', envHelper())

  res.setHeader('Set-Cookie', 'session=; HttpOnly; Secure; Path=/; Max-Age=0')
}

const verifySession = cache(async (req: NextApiRequest) => {
  console.log('____ SERVER sessionService: verifySession: ', envHelper())

  const session = req.cookies.session
  const sessionData = await decrypt(session)

  if (!sessionData?.username) {
    return null
  }

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
