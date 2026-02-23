"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Wireless Earbuds", price: "\u20B9499", image: "https://picsum.photos/seed/p1/400/400", category: "Electronics" },
  { id: 2, name: "Smart Watch", price: "\u20B9699", image: "https://picsum.photos/seed/p2/400/400", category: "Electronics" },
  { id: 3, name: "Casual T-Shirt", price: "\u20B9899", image: "https://picsum.photos/seed/p3/400/400", category: "Fashion" },
  { id: 4, name: "Denim Jacket", price: "\u20B9999", image: "https://picsum.photos/seed/p4/400/400", category: "Fashion" },
  { id: 5, name: "Android Phone", price: "\u20B91099", image: "https://picsum.photos/seed/p5/400/400", category: "Mobiles" },
  { id: 6, name: "Phone Case", price: "\u20B91299", image: "https://picsum.photos/seed/p6/400/400", category: "Mobiles" },
  { id: 7, name: "Mixer Grinder", price: "\u20B91499", image: "https://picsum.photos/seed/p7/400/400", category: "Home & Kitchen" },
  { id: 8, name: "Storage Container Set", price: "\u20B91699", image: "https://picsum.photos/seed/p8/400/400", category: "Home & Kitchen" },
  { id: 9, name: "Face Wash", price: "\u20B91899", image: "https://picsum.photos/seed/p9/400/400", category: "Beauty & Personal Care" },
  { id: 10, name: "Body Lotion", price: "\u20B91999", image: "https://picsum.photos/seed/p10/400/400", category: "Beauty & Personal Care" },
  { id: 11, name: "Yoga Mat", price: "\u20B92199", image: "https://picsum.photos/seed/p11/400/400", category: "Sports & Fitness" },
  { id: 12, name: "Dumbbell Set", price: "\u20B92499", image: "https://picsum.photos/seed/p12/400/400", category: "Sports & Fitness" },
  { id: 13, name: "Building Blocks Set", price: "\u20B9599", image: "https://picsum.photos/seed/p13/400/400", category: "Toys & Games" },
  { id: 14, name: "Story Book Pack", price: "\u20B9399", image: "https://picsum.photos/seed/p14/400/400", category: "Books" },
];

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    const rawCart = localStorage.getItem("cartItems");
    const cart: CartItem[] = rawCart ? JSON.parse(rawCart) : [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    router.push("/cart");
  };

  const handleClearFilter = () => {
    router.push("/Products");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-semibold">Products</h2>
      {selectedCategory ? (
        <div className="mb-6 flex items-center justify-between rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            Showing products in: <span className="font-semibold">{selectedCategory}</span>
          </p>
          <button
            onClick={handleClearFilter}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            All categories
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((item) => (
          <div key={item.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
            <img
              src={item.image || "/default-product.png"}
              alt={item.name}
              className="h-auto w-full rounded-t-lg object-cover md:h-40"
            />

            <div className="p-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <p className="text-xs text-gray-500">{item.category}</p>

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 w-full rounded-md bg-blue-600 py-2 text-white shadow-sm transition hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No products found for this category.</p>
      ) : null}
    </div>
  );
}
