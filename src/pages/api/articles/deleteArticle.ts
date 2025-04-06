import { sessionService } from '@/lib/auth/sessionService'
import { axiosBackendInstance } from '@/lib/axiosInstance'
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
    await axiosBackendInstance.delete(`/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${sessionData.accessToken}`,
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
      },
    })
    console.log('____ SERVER: articles/deleteArticle.ts - DELETED')
    res.status(204).end()
  } catch (error: any) {
    console.error('Error deleting article:', error)
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to delete article',
    })
  }
}
