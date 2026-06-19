"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, SlidersHorizontal, Search, Heart } from "lucide-react";
import { useAppContext } from "@/providers/AppProvider";
import { Product } from "@/lib/mockData";

const ProductCardItem = memo(function ProductCardItem({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  const { wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-violet-900/10 border border-gray-100 dark:border-gray-800 transition-all flex flex-col h-full relative">
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
      >
        <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400 hover:text-pink-500"}`} />
      </button>
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 flex flex-col gap-2 flex-grow">
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
        <p className="text-lg font-bold mt-auto mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            onAdd(product);
          }}
          className="w-full py-2.5 bg-gray-100 hover:bg-violet-600 hover:text-white dark:bg-gray-800 dark:hover:bg-violet-600 dark:hover:text-white text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const { products, addToCart, searchQuery, setSearchQuery } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All",
  );
  const [priceRange, setPriceRange] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortKey, setSortKey] = useState<string>("default");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showFilters) {
        setShowFilters(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFilters]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceRange, minRating]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price <= priceRange;
      const matchRating = p.rating >= minRating;
      return matchCategory && matchSearch && matchPrice && matchRating;
    });

    if (sortKey === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortKey === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortKey === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, sortKey]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Mobile filter toggle */}
      <div className="md:hidden flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg"
        >
          <SlidersHorizontal className="w-5 h-5" /> Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0 space-y-8`}
      >
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Categories
          </h3>
          <ul className="space-y-2">
            {["All", "Electronics", "Clothing", "Home", "Beauty"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm hover:text-violet-600 transition-colors ${selectedCategory === cat ? "font-bold text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Max Price: $${priceRange}
          </h3>
          <input
            type="range"
            min="10"
            max="300"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$10</span>
            <span>$300</span>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
            Minimum Rating
          </h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="accent-violet-600"
                />
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300 dark:text-gray-700"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    & Up
                  </span>
                </div>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
                className="accent-violet-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                Any Rating
              </span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex items-center gap-4">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="default">Sort by Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <p className="text-gray-500 text-sm">
              Showing {filteredProducts.length} results
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-80"
              ></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setPriceRange(300);
                setMinRating(0);
              }}
              className="mt-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
