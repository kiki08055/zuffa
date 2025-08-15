"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-softblue sticky top-0 text-choco shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between h-[100px] px-4 sm:px-6 lg:px-8">
        <button
          className="md:hidden mr-4"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex-shrink-0 mx-auto">
          <Image
            src="/1zuffa.png"
            alt="LOOPY HOUSE"
            width={140}
            height={80}
            className="w-32 md:w-40 object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          <Link href="/" className="hover:text-choco-800">
            Home
          </Link>
          <Link href="/boneka" className="hover:text-choco-800">
            Product
          </Link>
          <Link href="/about" className="hover:text-choco-800">
            About
          </Link>
          <button onClick={() => setSearchOpen(true)} className="hover:text-choco">
            <Search className="w-6 h-6" />
          </button>
          <Link href="/profile" className="hover:text-choco">
            <User className="w-6 h-6" />
          </Link>
        </nav>
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-72 bg-softblue z-50 shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setSidebarOpen(false)}>Home</Link>
              <Link href="/boneka" onClick={() => setSidebarOpen(false)}>Product</Link>
              <Link href="/about" onClick={() => setSidebarOpen(false)}>About</Link>
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
              <Link href="/profile" className="flex items-center space-x-2" onClick={() => setSidebarOpen(false)}>
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        </>
      )}

      {searchOpen && (
        <SearchPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </header>
  );
}

function SearchPanel({
  searchQuery,
  setSearchQuery,
  onClose,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/user/product/search?query=${searchQuery}`)
        .then((res) => {
          setSearchResults(res.data.data || []);
        })
        .catch(() => {
          setError("Gagal mengambil data.");
          setSearchResults([]);
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[360px] sm:w-[400px] bg-white text-choco shadow-lg z-50 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cari Produk</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Cari boneka atau produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-softblue text-black"
        />

        {loading && <p className="mt-4 text-sm text-gray-600">Memuat...</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <ul className="mt-4 space-y-3">
          {searchResults.map((item) => (
            <li key={item.productId}>
              <button
                onClick={() => {
                  router.push(`/boneka/${item.productId}`);
                  onClose();
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-softblue/10 transition"
              >
                <img
                  src={`/images/${item.image || "default.jpg"}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Rp {item.price?.toLocaleString()}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
