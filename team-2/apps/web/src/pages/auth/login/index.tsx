'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      })

      const result = response.data?.result
      if (!result || !result.accessToken || !result.refreshToken || !result.role) {
        throw new Error("Format respons tidak sesuai (missing token atau role)")
      }

      const { accessToken, refreshToken, role } = result

      Cookies.set('accessToken', accessToken, { path: '/' })
      Cookies.set('refreshToken', refreshToken, { path: '/' })
      Cookies.set('userRole', role, { path: '/' })

      if (role === 'ADMIN') {
        router.push('/admin/boneka')
      } else if (role === 'USER') {
        router.push('/')
      } else {
        setError('Role tidak dikenali')
      }

    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || err.message || 'Login gagal')
    }
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

        {/* Tambahan teks untuk register */}
        <p className="mt-4 text-center text-sm text-gray-800">
          Belum punya akun?{' '}
          <span
            onClick={() => router.push('/auth/register')}
            className="text-choco cursor-pointer hover:underline"
          >
            Register di sini
          </span>
        </p>
      </form>
    </div>
  )
}
