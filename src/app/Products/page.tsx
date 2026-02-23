"use client";

import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Product 1", price: "\u20B9499", image: "https://picsum.photos/seed/p1/400/400" },
  { id: 2, name: "Product 2", price: "\u20B9699", image: "https://picsum.photos/seed/p2/400/400" },
  { id: 3, name: "Product 3", price: "\u20B9899", image: "https://picsum.photos/seed/p3/400/400" },
  { id: 4, name: "Product 4", price: "\u20B9999", image: "https://picsum.photos/seed/p4/400/400" },
  { id: 5, name: "Product 5", price: "\u20B91099", image: "https://picsum.photos/seed/p5/400/400" },
  { id: 6, name: "Product 6", price: "\u20B91299", image: "https://picsum.photos/seed/p6/400/400" },
  { id: 7, name: "Product 7", price: "\u20B91499", image: "https://picsum.photos/seed/p7/400/400" },
  { id: 8, name: "Product 8", price: "\u20B91699", image: "https://picsum.photos/seed/p8/400/400" },
  { id: 9, name: "Product 9", price: "\u20B91899", image: "https://picsum.photos/seed/p9/400/400" },
  { id: 10, name: "Product 10", price: "\u20B91999", image: "https://picsum.photos/seed/p10/400/400" },
  { id: 11, name: "Product 11", price: "\u20B92199", image: "https://picsum.photos/seed/p11/400/400" },
  { id: 12, name: "Product 12", price: "\u20B92499", image: "https://picsum.photos/seed/p12/400/400" },
];

export default function Products() {
  const router = useRouter();

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

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-semibold">Products</h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <div key={item.id} className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
            <img
              src={item.image || "/default-product.png"}
              alt={item.name}
              className="h-auto w-full rounded-t-lg object-cover md:h-40"
            />

            <div className="p-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>

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
    </div>
  );
}
