import AdminSidebar from "../components/AdminSidebar";
export default function AdminProductsPage() {
  return (
    <>
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <AdminSidebar activePath="/admin/products" />
    <section className="py-8 px-5 ml-64">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Products
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">
        Manage Products
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Add your product list, filters, and actions here.
      </p>
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
        Product table placeholder
      </div>
    </section>
    </div>
    </>
  );
}
