import { sessionService } from '@/lib/auth/sessionService'
import { axiosBackendInstance } from '@/lib/axiosInstance'
import { handleApiError } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const articleId = req.query.id as string
  const sessionData = await sessionService.verifySession(req)

  if (!sessionData) {
    return handleApiError(401, ['general', 'unauthorized'], res)
  }

  const { title, perex, content, imageId } = req.body

  try {
    const response = await axiosBackendInstance.patch(
      `/articles/${articleId}`,
      { title, perex, content, imageId },
      {
        headers: {
          Authorization: `Bearer ${sessionData.accessToken}`,
          'X-API-KEY': process.env.APPLIFTING_API_KEY,
        },
      }
    )

    console.log('___ SERVER: editArticle - response.data', response.data)
    console.log('___ SERVER: editArticle - response.status', response.status)

    handleApiError(response.status, ['blog', 'updateArticle'], res)
  } catch (error) {
    console.error('Error updating article:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
