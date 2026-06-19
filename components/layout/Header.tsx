"use client";

import Link from "next/link";
import {
  ShoppingCart,
  LogIn,
  Store,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { useAppContext } from "@/providers/AppProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <circle cx="24" cy="24" r="22" fill="url(#swift)" />
      <path d="M14 16H34L30 28H18L14 16Z" fill="white" />
      <circle cx="20" cy="34" r="3" fill="white" />
      <circle cx="30" cy="34" r="3" fill="white" />
      <path
        d="M22 24L28 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 28L26 28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 20L30 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="swift"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-500 dark:from-violet-400 dark:to-pink-400 font-sans">
      SwiftCart
    </span>
  </div>
);

export default function Header() {
  const { cart, theme, toggleTheme, searchQuery, setSearchQuery } =
    useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products`);
    }
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center"
            aria-label="Home"
          >
            <Logo />
          </Link>

          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?category=Electronics"
              className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/products?category=Clothing"
              className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
            >
              Clothing
            </Link>
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-sm mx-4 relative"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-violet-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={toggleTheme}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mr-2"
            >
              Toggle Theme
            </button>
            <Link
              href="/orders"
              className="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors"
              aria-label="Orders"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/merchant"
              className="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors"
              title="Merchant Dashboard"
            >
              <Store className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-500 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mr-2"
            >
              Toggle Theme
            </button>
            <Link href="/cart" className="p-2 text-gray-500 relative">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-500 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                router.push("/products");
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 pl-2 pr-3 text-gray-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="px-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900"
            >
              Orders
            </Link>
            <Link
              href="/merchant"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900"
            >
              Merchant Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
