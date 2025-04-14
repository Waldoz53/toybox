'use client'

import { useState } from 'react'
import { login } from '../actions'
import Toast from '@/components/Toast'

export default function LoginPage() {
  const [message, setMessage] = useState('')
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setMessage(await login(formData))
    console.log("Login error:", message)

    const timer = setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button>Log in</button>
      </form>
      <Toast message={message}/>
    </div>
  )
}