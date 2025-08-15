'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

const FormProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
      const Role = Cookies.get("userRole");
    if(Role !== 'ADMIN') {
      router.push('/home')
    }

  const uploadToCloudinary = async () => {
    if (!file) return ''
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // preset Cloudinary kamu
    formData.append('cloud_name', 'doomcbcq6') // cloud name kamu

    const res = await fetch('https://api.cloudinary.com/v1_1/doomcbcq6/image/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return data.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrl = newProduct.image

      if (file) {
        imageUrl = await uploadToCloudinary()
      }

      await axios.post('http://localhost:8000/api/admin/product', {
        name: newProduct.name,
        price: parseInt(newProduct.price),
        image: imageUrl,
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
      })

      router.push('/admin/boneka')
    } catch (err) {
      console.error(err)
      setError('Gagal menambahkan produk.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-cream min-h-screen flex flex-col items-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Form Tambah Produk</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Harga</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Stok</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-medium text-gray-700">Kategori</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="BONEKA">Boneka</option>
              <option value="MAINAN">Mainan</option>
              <option value="COOKIES">Cookies</option>
              <option value="PAKET_HADIAH">Paket_Hadaiah</option>
              {/* Tambahkan sesuai enum Category kamu */}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">URL Gambar (opsional)</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="https://res.cloudinary.com/..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            disabled={loading}
          >
            {loading ? 'Menambahkan...' : 'Tambah Produk'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormProduct
