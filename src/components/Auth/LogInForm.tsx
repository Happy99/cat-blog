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
    console.log('state', state)
  }, [state, router])

  return (
    <form action={action} className={styles.loginForm}>
      {state?.success ? (
        <h3 className={`${styles.title} text-success`}>Logged in successfully</h3>
      ) : (
        <>
          <h3 className={styles.title}>Log In</h3>
          <div className="form-group">
            <label htmlFor="username" className={styles.formLabel}>
              Name
            </label>
            <input
              id="username"
              name="username"
              className={`form-control ${state?.errors?.username ? 'is-invalid' : ''}`}
            />
            {state?.errors?.username && (
              <div className="invalid-feedback">{state.errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${state?.errors?.password ? 'is-invalid' : ''}`}
            />
            {state?.errors?.password && (
              <div className="invalid-feedback">{state.errors.password}</div>
            )}
          </div>
          {state?.message && !state.success && <p className="text-danger">{state.message}</p>}
          <button disabled={pending} type="submit" className={`btn btn-primary ${styles.button}`}>
            {pending ? 'Logging in...' : 'Log In'}
          </button>
        </>
      )}
    </form>
  )
}

export default LogInForm
