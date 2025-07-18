'use client'

import { useEffect, useState } from "react";
import CardBoneka from "@/components/cardBoneka";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import { Product } from "@/utils/interface";
import SearchInput from "@/components/search";

export default function CookiesPage() {
  const [cookies, setCookies] = useState<Product[]>([]);
  const [filteredCookies, setFilteredCookies] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/product?category=cookies");
        setCookies(res.data.data);
        setFilteredCookies(res.data.data); // default tampil semua
      } catch (error) {
        console.error("Gagal memuat data cookies:", error);
      }
    };
    fetchCookies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-[#FFF9F0]">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Koleksi Cookies Kami
        </h1>

        <div className="max-w-xl mx-auto mb-6">
          <SearchInput
          category="COOKIES"
            onResults={(results) => {
              if (results.length > 0) {
                setFilteredCookies(results);
              } else {
                setFilteredCookies(cookies);
              }
            }}
          />
        </div>

        {filteredCookies.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            Tidak ada cookies yang ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCookies.map((item) => (
              <CardBoneka
                key={item.productId}
                bonekaId={item.productId}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
