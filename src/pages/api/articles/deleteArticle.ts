import { sessionService } from '@/lib/auth/sessionService'
import { axiosBackendInstance } from '@/lib/axiosInstance'
import { handleApiError } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const articleId = req.query.id as string
  const sessionData = await sessionService.verifySession(req)
  if (!sessionData) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const reponse = await axiosBackendInstance.delete(`/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${sessionData.accessToken}`,
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
      },
    })

    handleApiError(reponse.status, ['blog', 'deleteArticle'], res)
  } catch (error) {
    console.error('Error deleting article:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
