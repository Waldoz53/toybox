import { login } from '../actions'

export default function LoginPage() {
  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button formAction={login}>Log in</button>
      </form>
    </div>
  )
}