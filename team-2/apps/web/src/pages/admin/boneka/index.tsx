'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/utils/interface';
import NavbarAdmin from '@/components/navbarAdmin';
import axios from 'axios';

const FormProduct: React.FC = () => {
  const router = useRouter();
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/product');
        setProductData(response.data.data);
      } catch (error) {
        setError('Gagal memuat data produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/admin/update?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/product/${id}`);
      setProductData((prev) => prev.filter((item) => item.productId !== id));
    } catch (err) {
      alert('Gagal menghapus produk');
      console.error(err);
    }
  };

  const handleAdd = () => {
    router.push('/admin/publish');
  };

  return (
    <div className="flex">
      <NavbarAdmin />
      <div className="ml-64 p-6 bg-cream min-h-screen w-full">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Daftar Produk</h2>

        <button
          onClick={handleAdd}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tambahkan Produk
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-cream text-choco overflow-hidden">
            <thead className="bg-blue text-choco">
              <tr>
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Gambar</th>
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Harga</th>
                <th className="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={product.productId} className="border-t border-blue-500">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-6">{product.name}</td>
                  <td className="py-3 px-6">Rp {product.price}</td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product.productId)}
                        className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="bg-red-500 text-red-900 px-3 py-1 rounded hover:bg-red-400"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="text-center mt-4 text-choco">Memuat produk...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FormProduct;
