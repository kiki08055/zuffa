// src/components/navbarAdmin.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { LogOut, ShoppingCart, Box, Upload } from 'lucide-react'; // Tambah ikon Upload

const NavbarAdmin = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout clicked');
    router.push('/login');
  };

  const handleTransactionClick = () => {
    router.push('/admin/transactions');
  };

  const handleBonekaClick = () => {
    router.push('/admin/boneka');
  };

  const handlePublishClick = () => {
    router.push('/admin/publish');
  };

  return (
    <aside className="w-64 h-screen bg-softblue text-black p-6 shadow-md fixed top-0 left-0 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      <button
        onClick={handleTransactionClick}
        className="flex items-center gap-2 hover:text-blue-700"
      >
        <ShoppingCart size={20} />
        Transaction
      </button>

      <button
        onClick={handleBonekaClick}
        className="flex items-center gap-2 hover:text-blue-700"
      >
        <Box size={20} />
        Boneka
      </button>

      <button
        onClick={handlePublishClick}
        className="flex items-center gap-2 hover:text-blue-700"
      >
        <Upload size={20} />
        Publish
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-auto hover:text-red-700"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default NavbarAdmin;
