import { axiosFrontendInstance } from '@/lib/axiosInstance'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

// use this to understand if functionality is called on backend or frontend
export const envHelper = (): void => {
  console.log('_____ ENV TEST', process.env.NEXT_PUBLIC_TEST_CLIENT)
  console.log('_____ ENV TEST', process.env.TEST_DEV)
}

export async function validateFrontendSession(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) {
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

  return sessionData
}
