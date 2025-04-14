'use client'
import { useState } from 'react'
import { signup } from '../actions'
import Toast from '@/components/Toast'

export default function SignUpPage() {
  const [message, setMessage] = useState('')
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await signup(formData)
    setMessage(result ?? '')
    console.log("Sign up error:", message)

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button>Sign Up</button>
      </form>
      <Toast message={message}/>
    </div>
  )
}