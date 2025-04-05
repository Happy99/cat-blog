'use client'

import { authService } from '@/lib/auth/authService'
import { useRouter } from 'next/router'
import { useActionState, useEffect } from 'react'

const LogInForm = () => {
  const [state, action, pending] = useActionState(authService.login, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state, router])

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Name</label>
        <input id="username" name="username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      {state?.message && !state.success && <p>{state.message}</p>}
      <button disabled={pending} type="submit">
        {pending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LogInForm
