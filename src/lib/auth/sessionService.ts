import 'server-only'

import { SessionPayload } from '@/lib/definitions'
import { SignJWT, jwtVerify } from 'jose'
import { NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

async function createSession(
  { username, accessToken, tokenType, expiresIn }: SessionPayload,
  res: NextApiResponse
) {
  const expiresAt = new Date(Date.now() + expiresIn)
  console.log(
    '____ SESSION SERVICE: expiresAt',
    expiresAt.toLocaleString('en-GB', {
      timeZone: 'Europe/Prague',
      hour12: false,
    })
  )
  const session = await encrypt({ username, accessToken, tokenType, expiresIn })

  res.setHeader(
    'Set-Cookie',
    `session=${session}; HttpOnly; Secure; Expires=${expiresAt.toUTCString()}; SameSite=Lax; Path=/`
  )
}

async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.username) {
    redirect('/login')
  }

  return {
    isAuth: true,
    username: session.username,
    accessToken: session.accessToken,
    tokenType: session.tokenType,
    expiresIn: session.expiresIn,
  }
})

export const sessionService = {
  createSession,
  deleteSession,
  verifySession,
  decrypt,
  encrypt,
}
