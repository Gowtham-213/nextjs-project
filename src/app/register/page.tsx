"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

type ShopUser = {
  name: string;
  email: string;
  password: string;
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }

    const rawUsers = localStorage.getItem("shopUsers");
    const users: ShopUser[] = rawUsers ? JSON.parse(rawUsers) : [];

    const emailExists = users.some((item) => item.email === email);

    if (emailExists) {
      setError("Email already registered. Please login.");
      return;
    }

    const newUsers = [...users, { name, email, password }];

    localStorage.setItem("shopUsers", JSON.stringify(newUsers));
    localStorage.setItem("shopUser", JSON.stringify({ name, email }));

    router.push(redirectTo);
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-md px-6 py-12">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">Register</h1>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleRegister}
          className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}