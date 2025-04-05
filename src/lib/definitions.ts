import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).trim(),
  password: z.string().min(1, { message: 'Password is required' }).trim(),
})

export const SignupFormSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
