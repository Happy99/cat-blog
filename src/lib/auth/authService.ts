import { FormState, LoginFormSchema } from '@/lib/definitions'
import { ILoginResponseSuccess } from '@/pages/api/auth/auth.interfaces' // Import both
import { axiosFrontendInstance } from '../axiosInstance'

// Define the response structure with explicit success and error cases
type LoginResponse =
  | { data: { success: true; data: ILoginResponseSuccess['data'] } } // Success case
  | { data?: never; code: string; message: string } // Error case from interceptor

async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data
  const response = await handleAuthResponse(username, password)
  console.log('_____ CLIENT: authService.ts - login - response', response)

  // Check for error response from interceptor
  if ('code' in response) {
    if (response.code === 'INVALID_CREDENTIALS') {
      return {
        message: `Name or ${response.message}`,
      }
    }
    return {
      message: 'An unexpected error occurred',
    }
  }

  // Check success within response.data (Axios success case)
  if (response.data && response.data.success) {
    return {
      success: true,
      message: 'Login successful',
    }
  }

  return {
    message: 'An unexpected error occurred',
  }
}

async function handleAuthResponse(username: string, password: string): Promise<LoginResponse> {
  return await axiosFrontendInstance.post('/api/auth/login', {
    username,
    password,
  })
}

export const authService = { handleAuthResponse, login }
