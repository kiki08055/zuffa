'use client'

import { useState } from 'react'

export default function ProfileLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // hardcode email dan password
    if (email === 'user@example.com' && password === 'password123') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Email atau password salah')
      setIsLoggedIn(false)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-softblue p-4">
        <h1 className="text-3xl font-semibold mb-4 text-choco">Welcome, {email}!</h1>
        <p className="mb-6 text-choco-700">Ini halaman profile sederhana kamu.</p>
        <button
          className="px-4 py-2 bg-choco text-white rounded hover:bg-choco-700"
          onClick={() => {
            setIsLoggedIn(false)
            setEmail('')
            setPassword('')
          }}
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-softblue p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-choco">Login</h2>

        <label htmlFor="email" className="block mb-2 font-medium text-choco">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 mb-4 border border-choco rounded focus:outline-none focus:ring-2 focus:ring-softblue"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="block mb-2 font-medium text-choco">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 mb-4 border border-choco rounded focus:outline-none focus:ring-2 focus:ring-softblue"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-choco text-white py-2 rounded hover:bg-choco-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
