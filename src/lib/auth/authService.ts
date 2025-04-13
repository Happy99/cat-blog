import { LoginResponse } from '@/pages/api/auth/auth.interfaces'
import { LoginFormSchema, LoginFormState } from '@/schemas/login'
import { axiosFrontendInstance } from '../axiosInstance'

// TODO: refactor this - coulb be hook, needs better error handling
const login = async (
  state: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // form validation before ftchning data
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data
  const response = await handleAuthResponse(username, password)

  // error
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

  // success
  if (response.data?.success) {
    return {
      success: true,
      message: 'Login successful',
    }
  }

  // unexpected - should not happen, just in case
  return {
    message: 'An unexpected error occurred',
  }
}

const handleAuthResponse = async (username: string, password: string): Promise<LoginResponse> => {
  return await axiosFrontendInstance.post('/api/auth/login', {
    username,
    password,
  })
}

export const authService = { handleAuthResponse, login }
