"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  quantity: number;
};

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCartCount = () => {
      const rawCart = localStorage.getItem("cartItems");
      const cart: CartItem[] = rawCart ? JSON.parse(rawCart) : [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    syncCartCount();
    window.addEventListener("cart-updated", syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener("cart-updated", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex cursor-pointer flex-row items-center gap-5 text-2xl font-bold text-blue-600">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span>Myshop</span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/Categories" className="text-gray-700 hover:text-blue-600">
              Categories
            </Link>
            <Link href="/Products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/Contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="rounded-lg bg-blue-500 px-4 py-1 text-white transition hover:bg-blue-600"
            >
              Login
            </button>
            {showLogin && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70">
                <div className="relative w-full max-w-md rounded-2xl bg-white p-6">
                  <button
                    onClick={() => setShowLogin(false)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-black"
                  >
                    X
                  </button>

                  <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

                  <input
                    type="email"
                    placeholder="Email"
                    className="mb-4 w-full rounded-lg border p-3"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="mb-6 w-full rounded-lg border p-3"
                  />

                  <button className="w-full rounded-lg bg-blue-500 py-3 text-white">Login</button>
                </div>
              </div>
            )}

            <Link href="/cart" className="relative">
              <svg
                className="h-6 w-6 text-gray-700 transition hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m12-8l2 8m-6 0a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
