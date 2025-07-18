// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { X } from 'lucide-react'
// import axios from 'axios'

// interface SearchInputProps {
//   onClose: () => void
// }

// export default function SearchInput({ onClose }: SearchInputProps) {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     if (!searchQuery) {
//       setSearchResults([])
//       return
//     }

//     const delayDebounce = setTimeout(() => {
//       setLoading(true)
//       axios
//         .get(`http://localhost:8000/api/user/product/search?query=${searchQuery}`)
//         .then((res) => {
//           setSearchResults(res.data.data || [])
//         })
//         .catch(() => {
//           setError('Gagal mengambil data.')
//           setSearchResults([])
//         })
//         .finally(() => setLoading(false))
//     }, 500)

//     return () => clearTimeout(delayDebounce)
//   }, [searchQuery])

//   return (
//     <div className="fixed top-0 right-0 h-full w-64 bg-softblue bg-opacity-90 backdrop-blur-md shadow-lg z-50 p-4 overflow-y-auto">
//       <div className="flex justify-between items-center border-b border-choco pb-2 mb-4">
//         <h2 className="text-xl font-semibold text-choco">Search</h2>
//         <button onClick={onClose} className="text-choco">
//           <X className="h-6 w-6" />
//         </button>
//       </div>
//       <input
//         type="text"
//         placeholder="Cari boneka..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="px-3 py-2 rounded-md text-sm border border-choco bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-softblue w-full"
//       />

//       {loading && <p className="mt-2 text-choco text-sm">Memuat...</p>}
//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//       <ul className="mt-4 space-y-2">
//         {searchResults.map((item) => (
//           <li key={item.productId}>
//             <button
//               onClick={() => {
//                 router.push(`/boneka/${item.productId}`)
//                 onClose()
//               }}
//               className="w-full text-left px-2 py-1 bg-white rounded hover:bg-choco/10 text-choco"
//             >
//               {item.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
