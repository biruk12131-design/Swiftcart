"use client";

import React from "react";
import Link from "next/link";

// ... other imports
import { ArrowRight, Star, TrendingUp, ShieldCheck, Truck, Heart } from "lucide-react";
import { useAppContext } from "@/providers/AppProvider";

export default function HomePage() {
  const { products } = useAppContext();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 6);

  const categories = [
    {
      name: "Electronics",
      image: "https://picsum.photos/seed/cat-tech/400/300",
    },
    { name: "Clothing", image: "https://picsum.photos/seed/cat-cloth/400/300" },
    { name: "Home", image: "https://picsum.photos/seed/cat-home/400/300" },
    { name: "Beauty", image: "https://picsum.photos/seed/cat-beauty/400/300" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Banner */}
      <section className="relative bg-violet-900 border-b border-gray-200 dark:border-gray-800 text-white min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Redefine your
              <br />
              shopping experience.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Discover curated collections of premium products. Fast shipping,
              easy returns, and unmatched quality.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-violet-900 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-lg shadow-white/10"
            >
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="hidden md:block relative h-[400px]">
            <img
              src="https://picsum.photos/seed/hero-swiftcart/600/600"
              alt="Hero Product"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Fast Shipping</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              On all orders over $50
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Checkout</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              100% protected payments
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Crafted with excellence
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="group relative rounded-xl hover:shadow-xl dark:shadow-none overflow-hidden block"
            >
              <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-800">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white font-semibold text-xl">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products (Carousel Simulation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Collection
          </h2>
          <Link
            href="/products"
            className="text-violet-600 dark:text-violet-400 hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="flex overflow-x-auto space-x-6 pb-6 snap-x snap-mandatory hide-scrollbar">
          {featuredProducts.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            The latest trends and additions to our premium collection,
            hand-picked just for you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

const ProductCard = React.memo(function ProductCard({
  product,
}: {
  product: any;
}) {
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-violet-900/10 border border-gray-100 dark:border-gray-800 transition-all relative">
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
      >
        <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400 hover:text-pink-500"}`} />
      </button>
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.newArrival && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {product.category}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="font-semibold text-gray-900 dark:text-gray-100 truncate block hover:text-violet-600 transition-colors"
            >
              {product.name}
            </Link>
          </div>
          <div className="flex items-center text-yellow-500 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs ml-1 text-gray-700 dark:text-gray-300 font-medium">
              {product.rating}
            </span>
          </div>
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="mt-3 w-full py-2 bg-gray-100 hover:bg-violet-600 hover:text-white dark:bg-gray-800 dark:hover:bg-violet-600 dark:hover:text-white text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});
