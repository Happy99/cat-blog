import { sessionService } from '@/lib/auth/sessionService'
import { axiosBackendInstance } from '@/lib/axiosInstance'
import { handleApiError } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

// here is also very strange behavior, I think image can be deleted without access_token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('_*****__ SERVER: DELETE IMAGE HANDLER')
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const imageId = req.query.id as string
  console.log('_****__ SERVER: delete image - imageId: ', imageId)
  const sessionData = await sessionService.verifySession(req)
  console.log('_****__ SERVER: delete image - sessionData: ', sessionData)
  if (!sessionData) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  console.log('_****__ SERVER: delete image - sessionData.accessToken: ', sessionData.accessToken)

  try {
    console.log('_****__ SERVER: delete image TRY **********')
    const response = await axiosBackendInstance.delete(`/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${sessionData.accessToken}`,
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
      },
    })

    console.log('_***__ SERVER: delete image response: ', response.data)
    console.log('_***__ SERVER: delete image response STATUS: ', response.status)

    handleApiError(response.status, ['images', 'deleteImage'], res)
  } catch (error) {
    console.error('Error deleting image:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
