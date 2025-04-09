import { login } from '../actions'

export default function LoginPage() {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
      </form>
    </div>
  )
}