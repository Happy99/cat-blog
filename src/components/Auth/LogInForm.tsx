import { authService } from '@/lib/auth/authService'
import { useRouter } from 'next/router'
import { useActionState, useEffect } from 'react'
import styles from './loginform.module.css'

const LogInForm = () => {
  const [state, action, pending] = useActionState(authService.login, undefined) //TODO add default state
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state, router])

  return (
    <form action={action} className={styles.loginForm}>
      <h3 className={styles.title}>Log In</h3>
      <div className="form-group">
        <label htmlFor="username" className={styles.formLabel}>
          Name
        </label>
        <input id="username" name="username" className="form-control " />
        {state?.errors?.username && <p className="text-danger">{state.errors.username}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className={styles.formLabel}>
          Password
        </label>
        <input id="password" name="password" type="password" className="form-control" />
        {state?.errors?.password && <p className="text-danger">{state.errors.password}</p>}
      </div>
      {state?.message && !state.success && <p className="text-danger">{state.message}</p>}
      <button disabled={pending} type="submit" className={`btn btn-primary ${styles.button}`}>
        {pending ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}

export default LogInForm
