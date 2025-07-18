import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


export default function AboutPage() {
    return (
        <>
            < Navbar />
            <div className="bg-[#FFF9F0] min-h-screen py-16 px-6 text-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">About Us</h1>
                    <p className="text-lg mb-4">
                        Welcome to <span className="font-semibold">Sweet & Soft</span>! We're an online shop
                        offering adorable handmade dolls and delicious homemade cookies. Everything is crafted
                        with love to bring joy and comfort into your life.
                    </p>
                    <p className="text-lg mb-4">
                        Our dolls are made with high-quality materials and charming designs. Our cookies are
                        baked fresh daily using a special family recipe that everyone loves.
                    </p>
                    <p className="text-lg">
                        Thank you for supporting local, handmade products. 💖
                    </p>
                    <div className="mt-10">
                        <img
                            src="https://i.pinimg.com/736x/72/9e/c9/729ec93c1198486b66784eded2a77576.jpg"
                            alt="Dolls and Cookies"
                            className="mx-auto w-64 rounded-2xl shadow-md"
                        />
                    </div>
                </div>
            </div>
            < Footer />
        </>
    );
}
