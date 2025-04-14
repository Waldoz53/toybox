import { signup } from '../actions'

export default function SignUpPage() {
  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button formAction={signup}>Sign Up</button>
      </form>
    </div>
  )
}