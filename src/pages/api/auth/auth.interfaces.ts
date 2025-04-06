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

export type TLoginResponse = ILoginResponseSuccess | ILoginResponseFailed

// petstast: this is such a pain honestly, implement axios took me more then 15 hours
export type LoginResponse =
  | { data: { success: true; data: ILoginResponseSuccess['data'] } } // success
  | { data?: never; code: string; message: string } // error from axios
