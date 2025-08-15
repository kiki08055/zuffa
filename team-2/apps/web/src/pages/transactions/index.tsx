// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import axios from 'axios'
// import Cookies from 'js-cookie'
// import { Product, Transaction } from '@/utils/interface'

// export default function BeliSekarang() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const [product, setProduct] = useState<Product | null>(null)
//   const [quantity, setQuantity] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const productId = searchParams.get('id')
//   const userId = Cookies.get('userId')
// useEffect(() => {
//   if (!productId) {
//     setError('Produk tidak ditemukan')
//     return
//   }

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8000/api/user/product/${productId}`)
//       setProduct(res.data.data)
//     } catch {
//       setError('Gagal memuat data produk')
//     }
//   }

//   fetchProduct()
// }, [productId])


//   // Fungsi beli sekarang
//   const handleBuyNow = async () => {
//     if (!userId || !productId) {
//       setError('User atau produk tidak valid')
//       return
//     }

//     setLoading(true)
//     setError(null)

//     try {
//       const total_price = (product?.price || 0) * quantity

//       const res = await axios.post<Transaction>('http://localhost:8000/api/user/transactions', {
//         userId: Number(userId),
//         productId: Number(productId),
//         quantity,
//         total_price,
//         traansactionStatus: 'PENDING', // sesuai interface kamu (pakai ejaan yang sama)
//       })

//       console.log('Transaksi berhasil:', res.data)
//       alert('Pembelian berhasil dibuat!')
//       router.push('/riwayat-transaksi') // arahkan ke riwayat transaksi
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Gagal melakukan transaksi')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Beli Sekarang</h1>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         {!product ? (
//           <p>Memuat produk...</p>
//         ) : (
//           <>
//             <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//             <p className="text-gray-600">Harga: Rp {product.price.toLocaleString()}</p>

//             {/* Kalau mau tampilkan review */}
//             {product.reviews && product.reviews.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="font-semibold">Review:</h3>
//                 {product.reviews.map((review) => (
//                   <div key={review.reviewId} className="border-b border-gray-300 py-2">
//                     <p className="text-sm font-semibold">{review.name}</p>
//                     <p className="text-yellow-500">Rating: {review.rating}/5</p>
//                     <p className="text-gray-600">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="flex items-center gap-2 mt-4">
//               <label>Jumlah:</label>
//               <input
//                 type="number"
//                 min={1}
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//                 className="w-16 border rounded p-1"
//               />
//             </div>

//             <p className="mt-2 font-bold">
//               Total: Rp {(product.price * quantity).toLocaleString()}
//             </p>

//             <button
//               onClick={handleBuyNow}
//               disabled={loading}
//               className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//             >
//               {loading ? 'Memproses...' : 'Beli Sekarang'}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }
