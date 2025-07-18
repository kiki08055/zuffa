"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    checked: boolean;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Loopy",
            price: 350000,
            quantity: 1,
            image:
                "https://i.pinimg.com/736x/de/7b/6c/de7b6c2d2654ad5ad2a277a15305af22.jpg",
            checked: false,
        },
        {
            id: 2,
            name: "Classic Bag",
            price: 250000,
            quantity: 2,
            image:
                "https://i.pinimg.com/736x/56/dc/28/56dc2891f5d5ec03c6620f1e0523cc05.jpg",
            checked: false,
        },
    ]);

    const router = useRouter();

    const handleCheckout = () => {
        alert("Pesanan sedang diproses");
        setTimeout(() => {
            router.push("/boneka");
        }, 2000)
    }

    const toggleChecked = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const changeQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems
        .filter((item) => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-cream mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-blush-700">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Keranjang kamu kosong 😢</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center justify-between bg-cream rounded-xl shadow-md p-4 gap-4"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleChecked(item.id)}
                                    className="w-5 h-5 accent-blush-600"
                                />
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg">{item.name}</h2>
                                    <p className="text-sm text-choco">
                                        Rp {item.price.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => changeQuantity(item.id, -1)}
                                            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
                                        >
                                            −
                                        </button>
                                        <span className="text-choco">{item.quantity}</span>
                                        <button
                                            onClick={() => changeQuantity(item.id, 1)}
                                            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
                                        >
                                            ＋
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <p className="text-blush-700 font-medium">
                                    Rp {(item.price * item.quantity).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6 pt-4 border-t font-semibold text-lg">
                        <span>Total (terpilih)</span>
                        <span className="text-blush-700">Rp {totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="text-center mt-6">
                        <button
                            disabled={totalPrice === 0}
                            onClick={handleCheckout}
                            className={`px-6 py-2 rounded-full shadow transition ${totalPrice === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blush-600 text-choco hover:bg-blush-700"
                                }`}
                        >
                            Checkout Terpilih
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}
