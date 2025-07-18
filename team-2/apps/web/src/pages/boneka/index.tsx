'use client'

import { useEffect, useState } from "react";
import CardBoneka from "@/components/cardBoneka";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import { Product } from "@/utils/interface";
import SearchInput from "@/components/search";

export default function BonekaPage() {
  const [boneka, setBoneka] = useState<Product[]>([]);
  const [filteredBoneka, setFilteredBoneka] = useState<Product[]>([]);

  useEffect(() => {
    const fetchBoneka = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/product");
        setBoneka(res.data.data);
        setFilteredBoneka(res.data.data); // tampilkan semua saat pertama
      } catch (error) {
        console.error("Gagal memuat data Boneka:", error);
      }
    };
    fetchBoneka();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-10 bg-[#FFF9F0]">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Our Doll Collection
        </h1>

        <SearchInput onResults={(results) => {
          if (results.length > 0) {
            setFilteredBoneka(results)
          } else {
            setFilteredBoneka(boneka)
          }
        }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filteredBoneka.map((item) => (
            <CardBoneka
              key={item.productId}
              bonekaId={item.productId}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
