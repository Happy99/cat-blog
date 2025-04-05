import { FormState, LoginFormSchema } from '@/lib/definitions'
import { ILoginResponse } from '@/pages/api/auth/auth.interfaces'
import { axiosFrontendInstance } from '../axiosInstance'

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return before fetching data
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data
  const { data } = await authService.handleAuthResponse({
    username,
    password,
  })

  console.log('_____ CLIENT: authService.ts - login - response', data)

  // return form error if response contains result which is error
  if (data && data.code === 'INVALID_CREDENTIALS') {
    return {
      message: `Name or ${data.message}`,
    }
  }
}

export const handleAuthResponse = async ({
  username,
  password,
}: {
  username: string
  password: string
}): Promise<ILoginResponse> => {
  return await axiosFrontendInstance.post('api/auth/login', {
    username,
    password,
  })
}

const authService = { handleAuthResponse }

export default authService
