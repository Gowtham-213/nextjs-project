"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

function parsePrice(value: string) {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const rawCart = localStorage.getItem("cartItems");
    const cart: CartItem[] = rawCart ? JSON.parse(rawCart) : [];
    setCartItems(cart);
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const increaseQty = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (id: number) => {
    const updated = cartItems
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const grandTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [cartItems]
  );

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="mb-4 text-gray-600">Your cart is empty.</p>
          <Link
            href="/Products"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.price}</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    Subtotal: {"\u20B9"}
                    {parsePrice(item.price) * item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="h-8 w-8 rounded-md border border-gray-300 text-gray-700"
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="h-8 w-8 rounded-md border border-gray-300 text-gray-700"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
            <p className="mb-2 text-sm text-gray-600">Items: {cartItems.length}</p>
            <p className="mb-4 text-xl font-bold text-gray-900">
              Total: {"\u20B9"}
              {grandTotal}
            </p>
            <Link
              href="/checkout"
              className="block w-full rounded-lg bg-blue-600 py-2.5 text-center text-white hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
