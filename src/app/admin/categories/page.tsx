"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminCategoriesPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { id?: string; name?: string; image?: string; imageUrl?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setListError("Admin token missing. Please login again.");
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/api/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch categories");
        }
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.categories)
          ? data.categories
          : Array.isArray(data.data)
          ? data.data
          : [];
        setCategories(list);
      })
      .catch((err: Error) => {
        setListError(err.message || "Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files?.[0] ?? null;
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      alert("Please provide category name and image.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("image", formData.image);

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin token missing. Please login again.");
      return;
    }

    fetch("http://localhost:5000/api/categories/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formPayload,
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Failed to add category");
        }
        setFormData({ name: "", image: null });
        setPreviewUrl(null);
        alert("Category added successfully.");
      })
      .catch((err: Error) => {
        alert(err.message || "Something went wrong.");
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6">
        <AdminSidebar activePath="/admin/categories" />
        <main className="ml-64 flex-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">
            Add Category
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Submit a new category with a name and image.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category Image
              </label>
              <div className="mt-2">
                <label
                  htmlFor="category-image"
                  className="flex h-40 w-56 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-slate-400"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Selected category"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                        Add Image
                      </span>
                    </div>
                  )}
                </label>
                <input
                  id="category-image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Submit
            </button>
          </form>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900">
              Categories
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              All categories from the API.
            </p>
            {loading && (
              <div className="mt-4 rounded-2xl border border-slate-200 p-4 text-sm text-slate-500">
                Loading categories...
              </div>
            )}
            {!loading && listError && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {listError}
              </div>
            )}
            {!loading && !listError && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-500">
                    No categories found.
                  </div>
                )}
                {categories.map((category, index) => {
                  const name = category.name ?? `Category ${index + 1}`;
                  const image =
                    category.imageUrl ?? category.image ?? undefined;
                  return (
                    <div
                      key={category.id ?? index}
                      className="rounded-2xl border border-slate-200 p-3"
                    >
                      <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-100">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        {name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
