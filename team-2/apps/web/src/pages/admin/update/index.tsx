'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Product } from '@/utils/interface';
import Cookies from 'js-cookie';

export default function UpdateProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;

  const [product, setProduct] = useState<Product>({
    productId: 0,
    name: '',
    price: 0,
    image: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const Role = Cookies.get("userRole");
    if (Role !== 'ADMIN') {
      router.push('/home')
    }

    if (id !== null) {
      axios
        .get(`http://localhost:8000/api/admin/product/${id}`)
        .then((res) => setProduct(res.data.data))
        .catch((err) => {
          console.error(err);
          setError('Gagal memuat data produk.');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/admin/product/${product.productId}`, {
        name: product.name,
        price: product.price,
        image: product.image,
      });
      router.push('/admin/product');
    } catch (err) {
      console.error('Gagal update produk:', err);
      alert('Gagal update produk.');
    }
  };

  if (loading) return <p className="text-center mt-10 text-choco">Memuat data produk...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Update Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Produk */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-choco mb-1">
              Nama Produk
            </label>
            <input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-softblue focus:outline-none"
              required
            />
          </div>

          {/* Harga */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-choco mb-1">
              Harga (Rp)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-softblue focus:outline-none"
              required
            />
          </div>

          {/* Gambar */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-choco mb-1">
              URL Gambar
            </label>
            <input
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-softblue focus:outline-none"
              required
            />
          </div>

          {/* Preview */}
          {product.image && (
            <div className="flex justify-center mt-4">
              <img
                src={product.image}
                alt="Preview Produk"
                className="w-40 h-40 object-cover rounded-md border"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-softblue hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
