import { axiosBackendInstance } from '@/lib/axiosInstance'
import { handleApiError } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('___ SERVER: getArticle HANDLER START')
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('___ SERVER: getArticle HANDLER 222')

  const articleId = req.query.id as string
  console.log('___ SERVER: getArticle - articleId: ', articleId)
  console.log('___ SERVER: getArticle HANDLER 333')

  try {
    const reponse = await axiosBackendInstance.get(`/articles/${articleId}`, {
      headers: {
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
      },
    })

    console.log('___ SERVER: getArticle HANDLER 444')
    console.log('___ SERVER: getArticle - response: ', reponse)

    // revalidatePath('/admin/articles')
    if (reponse.status === 200) {
      res.status(200).send(reponse.data)
    }

    handleApiError(reponse.status, ['blog', 'getArticle'], res)
  } catch (error) {
    console.error('Error fetching article:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
