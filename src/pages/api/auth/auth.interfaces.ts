import { UUID } from '@/lib/articles/articles.interfaces'

export interface ILoginResponse {
  status: number
  statusText: string
  data: {
    code?: string
    message?: string
    access_token?: UUID
    expires_in?: number
    token_type?: string
  }
}
