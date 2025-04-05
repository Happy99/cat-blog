import { axiosBackendInstance } from '@/lib/axiosInstance'
import { envHelper } from '@/utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ILoginResponse } from './auth.interfaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  const response = await axiosBackendInstance.post<ILoginResponse>('/login', {
    username,
    password,
  })

  console.log('_____ login.ts - authUser - response', response)
  const result = response.data ? response.data : response
  envHelper()

  res.status(200).send(result)
}
