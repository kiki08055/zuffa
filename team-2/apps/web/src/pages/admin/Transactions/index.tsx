'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/utils/interface";
import axios from "axios";
import NavbarAdmin from "@/components/navbarAdmin";

export default function ViewTransaction() {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/transactions');
        setTransactionData(response.data.data);
      } catch (error) {
        setError('Gagal memuat data transaksi');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex">
      <NavbarAdmin />
      <div className="ml-64 p-6 bg-cream min-h-screen w-full">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Daftar Transaction</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-cream text-choco border">
              <thead className="bg-blue text-choco">
                <tr>
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Buyer</th>
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Harga</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction, index) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{transaction.user?.email || 'Unknown'}</td>
                    <td className="py-3 px-6">{transaction.product?.name || 'Unknown'}</td>
                    <td className="py-3 px-6">Rp {transaction.total_price}</td>
                    <td className="py-3 px-6">{transaction.traansactionStatus}</td>
                    <td className="py-3 px-6">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
