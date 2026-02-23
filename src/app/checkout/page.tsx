"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const rawCart = localStorage.getItem("cartItems");
    const cart: CartItem[] = rawCart ? JSON.parse(rawCart) : [];
    setCartItems(cart);
  }, []);

  const itemTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [cartItems]
  );

  const deliveryFee = cartItems.length > 0 ? 49 : 0;
  const grandTotal = itemTotal + deliveryFee;

  const handlePlaceOrder = () => {
    const loggedInUser = localStorage.getItem("shopUser");
    if (!loggedInUser) {
      setShowAuthPrompt(true);
      return;
    }

    const requiredFields = [
      form.firstName,
      form.lastName,
      form.email,
      form.phone,
      form.address,
      form.city,
      form.pincode,
    ];

    const isValid = requiredFields.every((field) => field.trim().length > 0);
    if (!isValid) {
      window.alert("Please fill all delivery details before placing your order.");
      return;
    }

    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cart-updated"));
    setCartItems([]);
    setShowSuccess(true);
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="mb-4 text-gray-600">Your cart is empty. Add products before checkout.</p>
          <Link
            href="/Products"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Delivery Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="First Name"
                className="rounded-lg border border-gray-300 p-3"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                placeholder="Last Name"
                className="rounded-lg border border-gray-300 p-3"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <input
                placeholder="Email"
                className="rounded-lg border border-gray-300 p-3 md:col-span-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Phone Number"
                className="rounded-lg border border-gray-300 p-3 md:col-span-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Address"
                className="rounded-lg border border-gray-300 p-3 md:col-span-2"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <input
                placeholder="City"
                className="rounded-lg border border-gray-300 p-3"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                placeholder="Pincode"
                className="rounded-lg border border-gray-300 p-3"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
            </div>

            <h2 className="mb-3 mt-8 text-xl font-semibold text-gray-900">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Place Order
            </button>
          </section>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {"\u20B9"}
                    {parsePrice(item.price) * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-4 border-t border-gray-200" />
            <p className="mb-2 flex items-center justify-between text-sm text-gray-700">
              <span>Items Total</span>
              <span>
                {"\u20B9"}
                {itemTotal}
              </span>
            </p>
            <p className="mb-2 flex items-center justify-between text-sm text-gray-700">
              <span>Delivery Fee</span>
              <span>
                {"\u20B9"}
                {deliveryFee}
              </span>
            </p>
            <p className="flex items-center justify-between text-lg font-bold text-gray-900">
              <span>Grand Total</span>
              <span>
                {"\u20B9"}
                {grandTotal}
              </span>
            </p>
          </aside>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="mb-2 text-2xl font-bold text-green-600">Order Placed</h2>
            <p className="mb-5 text-gray-700">Your order has been placed successfully.</p>
            <Link
              href="/"
              className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {showAuthPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Login Required</h2>
            <p className="mb-5 text-gray-700">Please login or register before placing your order.</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/login?redirect=/checkout"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register?redirect=/checkout"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
            <button
              onClick={() => setShowAuthPrompt(false)}
              className="mt-4 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
