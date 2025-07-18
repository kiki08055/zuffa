"use client"
import { useRouter } from "next/router"
import Navbar from "@/components/navbar"
import { useState, useEffect, FormEvent } from "react"
import axios from "axios"

export default function DetailProductPage() {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    text: "",
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/product/${id}`)
        setProduct(response.data.data)
        if (response.data.data.reviews) {
          setReviews(response.data.data.reviews)
        }
      } catch (error) {
        console.error("Gagal memuat data produk:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")

    const { name, rating, text } = newReview

    if (!name || !text || rating < 1 || rating > 5) {
      setErrorMsg("Mohon isi semua field dengan benar.")
      return
    }

    const containsToxicWords = (text: string) => {
      const toxicWords = ["bodoh", "goblok", "jelek"]
      return toxicWords.some((word) => text.toLowerCase().includes(word))
    }

    if (containsToxicWords(text)) {
      setErrorMsg("Komentar mengandung kata tidak pantas.")
      return
    }

    try {
      const res = await axios.post("http://localhost:8000/api/user/reviews", {
        productId: product.productId,
        name,
        rating,
        text,
      })

      setSuccessMsg("Review berhasil dikirim!")

      setReviews((prev) => [
        {
          reviewId: res.data.data.reviewId,
          name,
          rating,
          text,
        },
        ...prev,
      ])

      setNewReview({ name: "", rating: 5, text: "" })

      const refresh = await axios.get(`http://localhost:8000/api/user/product/${id}`)
      setProduct(refresh.data.data)
    } catch (error) {
      console.error("Gagal mengirim review:", error)
      setErrorMsg("Gagal mengirim review. Coba lagi nanti.")
    }
  }

  if (loading) {
    return <p className="text-center text-brown-600">Memuat Produk...</p>
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <p className="text-center text-xl text-choco">Produk tidak ditemukan.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12 bg-cream">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blush-600 underline hover:text-blush-800 transition"
        >
          ← Kembali
        </button>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-full md:w-auto flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-w-[400px] object-contain rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-3xl font-bold text-choco">{product.name}</h1>
            <p className="text-lg text-choco">Harga: Rp {product.price.toLocaleString()}</p>
            <button className="mt-2 px-5 py-2 bg-softblue text-choco rounded-lg hover:bg-blue-300 transition">
              Beli Sekarang
            </button>
          </div>
        </div>

        {/* Ulasan */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-choco mb-4">Ulasan</h2>

          {reviews.length > 0 ? (
            <ul className="space-y-4 mb-6">
              {reviews.map((review) => (
                <li key={review.reviewId} className="border-b pb-4">
                  <p className="font-semibold text-choco">{review.name}</p>
                  <p className="text-yellow-600">Rating: {review.rating} / 5</p>
                  <p className="text-choco">{review.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-choco mb-6">Belum ada ulasan untuk produk ini.</p>
          )}

          {/* Form Tambah Review */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
                {errorMsg}
              </p>
            )}
            {successMsg && (
              <p className="text-sm text-green-600 bg-green-100 px-3 py-2 rounded">
                {successMsg}
              </p>
            )}

            <div>
              <label className="block text-choco font-medium mb-1">Nama Anda</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue"
                placeholder="Contoh: Dina"
              />
            </div>

            <div>
              <label className="block text-choco font-medium mb-1">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue"
              >
                {[5, 4, 3, 2, 1].map((rate) => (
                  <option key={rate} value={rate}>
                    ⭐ {rate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-choco font-medium mb-1">Komentar</label>
              <textarea
                rows={4}
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue resize-none"
                placeholder="Tulis pendapatmu tentang produk ini..."
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-400 transition"
              >
                Kirim Ulasan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
