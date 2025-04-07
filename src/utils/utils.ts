import { axiosFrontendInstance } from '@/lib/axiosInstance'
import { IncomingMessage } from 'http'
import { NextApiResponse } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

type ErrorMessages = {
  [key: number]: string
}

type ErrorPath = {
  [key: string]: ErrorMessages | ErrorPath
}

type ErrorStructure = {
  [key: string]: ErrorPath
}

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

export const nextErrors: ErrorStructure = {
  blog: {
    createArticle: {
      200: 'Article created successfully',
      401: 'API key is missing or invalid',
      403: 'Access token is missing or invalid',
    },
    deleteArticle: {
      204: 'Article deleted successfully',
      401: 'API key is missing or invalid',
      403: 'Access token is missing or invalid',
    },
  },
  images: {
    upload: {
      201: 'Image uploaded successfully',
      401: 'API key is missing or invalid',
    },
  },
}

export const handleApiError = (statusCode: number, from: string[], res: NextApiResponse) => {
  let errorMessage = ''
  let current: ErrorPath | ErrorMessages = nextErrors
  for (const key of from) {
    if (current[key] && typeof current[key] === 'object') {
      current = current[key] as ErrorPath
    }
  }

  if ((current as ErrorMessages)[statusCode]) {
    errorMessage = (current as ErrorMessages)[statusCode]
  }

  if (statusCode === 204) {
    return res.status(statusCode).end()
  }

  return res.status(statusCode).json(errorMessage || 'An unknown error occurred')
}
