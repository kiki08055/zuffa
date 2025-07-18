'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '@/utils/interface'

interface SearchInputProps {
  onResults: (results: Product[]) => void
  category?: string // Tambahkan prop ini
}

export default function SearchInput({ onResults, category }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!searchQuery) {
      onResults([]) // Kosongkan hasil kalau query kosong
      return
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true)

      axios
        .get('http://localhost:8000/api/user/product/search', {
          params: {
            query: searchQuery,
            ...(category && { category }), // sertakan category kalau ada
          },
        })
        .then((res) => {
          onResults(res.data.data || [])
        })
        .catch(() => {
          setError('Gagal mengambil data.')
          onResults([])
        })
        .finally(() => setLoading(false))
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [searchQuery, onResults, category])

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        placeholder="Cari boneka..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 w-full text-sm focus:outline-none focus:ring-2 focus:ring-softblue"
      />
      {loading && <p className="mt-2 text-gray-500 text-sm">Memuat...</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
