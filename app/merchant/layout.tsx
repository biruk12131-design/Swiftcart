"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  ListOrdered,
  ArrowLeft,
  Store,
} from "lucide-react";
import { useAppContext } from "@/providers/AppProvider";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useAppContext();

  const navItems = [
    { name: "Dashboard", path: "/merchant", icon: LayoutDashboard },
    { name: "Products", path: "/merchant/products", icon: PackageSearch },
    { name: "Orders", path: "/merchant/orders", icon: ListOrdered },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Store className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            <span className="font-bold text-lg tracking-tight">
              Merchant Panel
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Store
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"}`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 shrink-0">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {navItems.find((i) => i.path === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              Toggle Theme
            </button>
            <div className="w-8 h-8 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full"></div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
