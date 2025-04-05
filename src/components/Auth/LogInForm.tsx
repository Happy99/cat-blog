import { login } from '@/lib/auth/authService'
import { useActionState } from 'react'

const LogInForm = () => {
  const [state, action, pending] = useActionState(login, undefined)

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
      {state?.message && <p>{state.message}</p>}
      <button disabled={pending} type="submit">
        Login
      </button>
    </form>
  )
}

export default LogInForm
