import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboardPage() {
  return (
    <>

    <div className="min-h-screen bg-slate-50 text-slate-900">
           <AdminSidebar activePath="/admin/dashboard" />
      <div className="mx-auto flex  max-w-7xl gap-6 px-4 py-6 ml-64">
       
        <main className="flex-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Overview
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Welcome back, Admin
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            This is your dashboard. Replace these blocks with real widgets.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Total Orders
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                1,248
              </p>
              <p className="mt-1 text-xs text-slate-500">+12% this week</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Active Users
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                842
              </p>
              <p className="mt-1 text-xs text-slate-500">+5% this week</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-700">Revenue</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                $38,920
              </p>
              <p className="mt-1 text-xs text-slate-500">+9% this week</p>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
