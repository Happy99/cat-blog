import { axiosBackendInstance } from '@/lib/axiosInstance'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const imageId = req.query.id as string
  console.log('_****__ server get image: imageId: ', imageId)

  try {
    const response = await axiosBackendInstance.get(`/images/${imageId}`, {
      headers: {
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
      },
      responseType: 'arraybuffer', // Get raw image data
    })

    console.log('___ server get image response: ', response)

    res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

    res.status(200).send(response.data)
  } catch (error) {
    console.error('Error fetching image:', error)
    res.status(500).json({
      error: 'Failed to fetch image',
    })
  }
}
