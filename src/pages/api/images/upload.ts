import { sessionService } from '@/lib/auth/sessionService'
import { axiosBackendInstance } from '@/lib/axiosInstance'
import { handleApiError } from '@/utils/utils'
import formidable from 'formidable'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionData = await sessionService.verifySession(req)
  if (!sessionData) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const form = formidable({ multiples: false })
  try {
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err)
          else resolve([fields, files])
        })
      }
    )

    console.log('fields', fields)
    console.log('files', files)

    const file = Array.isArray(files.image) ? files.image[0] : files.image
    if (!file) {
      return res.status(400).json({ error: 'No image provided' })
    }

    const fileBuffer = await fs.readFile(file.filepath)
    const formData = new FormData()
    formData.append('image', new Blob([fileBuffer]), file.originalFilename || 'image')

    const response = await axiosBackendInstance.post('/images', formData, {
      headers: {
        Authorization: `Bearer ${sessionData.accessToken}`,
        'X-API-KEY': process.env.APPLIFTING_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    })

    // 10/04/2025: I am getting 200, but should be 201 because of the post request, maybe axios? I would bet that 201 worked before in commitID: 14d8aff259b58dbe42fa4b19dc25bfaea49769c0
    if (response.status === 200 || response.status === 201) {
      return res.status(response.status).json(response.data)
    }

    handleApiError(response.status, ['images', 'uploadImage'], res)
  } catch (error) {
    console.error('Error creating article:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
