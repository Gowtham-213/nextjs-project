import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://picsum.photos/seed/electronics/400/300",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://picsum.photos/seed/fashion/400/300",
  },
  {
    id: 3,
    name: "Mobiles",
    image: "https://picsum.photos/seed/mobiles/400/300",
  },
  {
    id: 4,
    name: "Home & Kitchen",
    image: "https://picsum.photos/seed/home/400/300",
  },
  {
    id: 5,
    name: "Beauty & Personal Care",
    image: "https://picsum.photos/seed/beauty/400/300",
  },
  {
    id: 6,
    name: "Sports & Fitness",
    image: "https://picsum.photos/seed/sports/400/300",
  },
  {
    id: 7,
    name: "Toys & Games",
    image: "https://picsum.photos/seed/toys/400/300",
  },
  {
    id: 8,
    name: "Books",
    image: "https://picsum.photos/seed/books/400/300",
  },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="bg-white rounded-lg overflow-hidden shadow transition block"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
