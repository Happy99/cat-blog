import { UUID } from '@/lib/articles/articles.interfaces'

export interface ILoginResponseSuccess {
  data: {
    access_token: UUID
    expires_in: number
    token_type: string
  }
}

export interface ILoginResponseFailed {
  code: string
  message: string
}

export type ILoginResponse = ILoginResponseSuccess | ILoginResponseFailed
