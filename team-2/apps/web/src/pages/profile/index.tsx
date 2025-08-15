'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Profile {
  email: string
  role: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('accessToken')

      // ⛔ Kalau belum login (ga ada token) → arahkan ke REGISTER dulu
      if (!token) {
        router.push('/auth/register')
        return
      }

      try {
        const res = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setProfile(res.data.data)
      } catch (err) {
        setError('Gagal mengambil data profil. Silakan login ulang.')
        Cookies.remove('accessToken')
        router.push('/auth/login') // kalau token error → ke login
      }
    }

    fetchProfile()
  }, [router])

  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('userRole')
    router.push('/auth/login')
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-softblue p-4">
        <p className="text-choco text-lg">{error || 'Memuat profil...'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-softblue px-4 py-8">
      <div className="w-full max-w-sm mb-6">
        <button
          onClick={() => router.back()}
          className="text-blush-600 underline hover:text-blush-800 transition"
        >
          ← Kembali
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-choco">Profil Saya</h2>
        <p className="mb-2 text-choco break-words">Email: {profile.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
