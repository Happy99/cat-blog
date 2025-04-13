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

export const validateFrontendSession = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
  console.log('_***____ SERVER: validateFrontendSession START')
  const sessionResponse = await axiosFrontendInstance.get('/api/auth/session', {
    headers: {
      Cookie: req.headers.cookie ?? '',
    },
  })

  console.log(
    '_*****____ SERVER: validateFrontendSession - sessionResponse',
    sessionResponse.status,
    sessionResponse.data
  )

  return sessionResponse
}

export const nextErrors: ErrorStructure = {
  general: {
    unauthorized: {
      401: 'Unauthorized',
    },
    internalServerError: {
      500: 'Internal server error',
    },
  },
  blog: {
    getArticle: {
      200: 'Article fetched successfully',
      401: 'API key is missing or invalid',
    },
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
    updateArticle: {
      200: 'Article updated successfully',
      401: 'API key is missing or invalid',
      403: 'Access token is missing or invalid',
    },
  },
  images: {
    getImage: {
      200: 'Image fetched successfully',
      401: 'API key is missing or invalid',
    },
    createImage: {
      200: 'Image uploaded successfully', // 10/04/2025: I am getting 200, but should be 201 because of the post request, maybe axios? I would bet that 201 worked before in commitID: 14d8aff259b58dbe42fa4b19dc25bfaea49769c0
      201: 'Image uploaded successfully',
      401: 'API key is missing or invalid',
    },
    deleteImage: {
      204: 'Image deleted successfully',
      401: 'API key is missing or invalid',
    },
  },
}

export const handleApiError = (statusCode: number, from: string[], res: NextApiResponse) => {
  let errorMessage = ''
  let current: ErrorPath | ErrorMessages = nextErrors
  let isCreateArticle = false
  for (const key of from) {
    if (current[key] && typeof current[key] === 'object') {
      current = current[key] as ErrorPath
    }
    if (key === 'createArticle') {
      isCreateArticle = true
    }
  }

  if ((current as ErrorMessages)[statusCode]) {
    errorMessage = (current as ErrorMessages)[statusCode]
  }

  if (isCreateArticle && statusCode === 200) {
    return res
      .status(statusCode)
      .json({ message: 'Article created successfully', revalidated: true })
  }

  if (statusCode === 204) {
    return res.status(statusCode).end()
  }

  if (statusCode === 500) {
    return res.status(200).json({ message: 'Internal server error' })
  }

  return res.status(statusCode).json(errorMessage || 'An unknown error occurred')
}
