'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await axios.post('http://localhost:8000/api/auth/register/user', {
        email,
        password,
        name,
      })

      setSuccess('Registrasi berhasil! Silakan login.')
      setTimeout(() => {
        router.push('/auth/login') 
      }, 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registrasi gagal')
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-softblue p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-choco">Register</h2>

        <label htmlFor="name" className="block mb-2 font-medium text-choco">
          Nama
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 mb-4 border border-choco rounded focus:outline-none focus:ring-2 focus:ring-softblue"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
        {success && <p className="mb-4 text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full bg-choco text-white py-2 rounded hover:bg-choco-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  )
}
