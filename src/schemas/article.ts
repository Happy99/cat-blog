import { z } from 'zod'

export const NewArticleFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).trim(),
  perex: z
    .string()
    .min(1, { message: 'Perex is required' })
    .max(100, { message: 'Perex must be less than 100 characters' })
    .trim(),
  content: z.string().min(1, { message: 'Content is required' }).trim(),
  imageId: z.string().min(1, { message: 'Image is required' }).trim(),
})

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
