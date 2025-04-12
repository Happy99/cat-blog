import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).trim(),
  password: z.string().min(1, { message: 'Password is required' }).trim(),
})

export const NewArticleFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).trim(),
  perex: z.string().min(1, { message: 'Perex is required' }).trim(),
  content: z.string().min(1, { message: 'Content is required' }).trim(),
  imageId: z.string().min(1, { message: 'Image is required' }).trim(),
})

export interface LoginFormState {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
}

export interface NewArticleFormState {
  errors?: {
    title?: string[]
    perex?: string[]
    content?: string[]
    imageId?: string[]
  }
  title?: string
  perex?: string
  content?: string
  imageId?: string
  message?: string
  success?: boolean
}

export type SessionPayload = {
  username: string
  accessToken: string
  tokenType: string
  expiresIn: number
}
