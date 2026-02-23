import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/categories", label: " Add Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/settings", label: "Settings" },
];

type AdminSidebarProps = {
  activePath?: string;
};

export default function AdminSidebar({ activePath }: AdminSidebarProps) {
  return (
    <aside
      className="
        fixed top-0 left-0 bottom-0 
        w-64 
        bg-slate-900 
        text-slate-100
        p-5 
        shadow-lg
      "
    >
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Admin
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
          Control Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block rounded-xl px-3 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          More
        </p>
        <div className="mt-3 space-y-1">
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
            Analytics
          </button>
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
            Support
          </button>
        </div>
      </div>
    </aside>
  );
}
