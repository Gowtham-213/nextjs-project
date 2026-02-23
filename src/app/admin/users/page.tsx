"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

type UserRecord = Record<string, unknown>;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin token missing. Please login again.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.users)
          ? data.users
          : Array.isArray(data.data)
          ? data.data
          : [];
        setUsers(list as UserRecord[]);
      })
      .catch((err: Error) => {
        setError(err.message || "Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6">
        <AdminSidebar activePath="/admin/users" />
        <main className=" ml-64 flex-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <section className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Users
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                Manage Users
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Users pulled from the API are listed below.
              </p>
            </div>

            {loading && (
              <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-500">
                Loading users...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-6 text-center text-slate-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                    {users.map((user, index) => {
                      const name =
                        (user.name as string) ||
                        (user.username as string) ||
                        (user.fullName as string) ||
                        `User ${index + 1}`;
                      const email = (user.email as string) || "-";
                      const role = (user.role as string) || "-";

                      return (
                        <tr
                          key={(user.id as string) ?? index}
                          className="border-t"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{email}</td>
                          <td className="px-4 py-3 text-slate-600">{role}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
