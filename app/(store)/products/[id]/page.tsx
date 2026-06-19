"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import { useState, useEffect } from "react";
import { Star, Truck, Shield, RotateCcw, Minus, Plus, Heart } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { products, addToCart, wishlist, toggleWishlist } = useAppContext();
  const [product, setProduct] = useState(products.find((p) => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<{rating: number; text: string; date: string}[]>([
    { rating: 5, text: "Excellent product! Exceeded my expectations.", date: new Date().toLocaleDateString() },
    { rating: 4, text: "Very good quality, but delivery took a bit longer.", date: new Date().toLocaleDateString() }
  ]);

  useEffect(() => {
    // Simulating API request for detail page
    const timer = setTimeout(() => {
      setProduct(products.find((p) => p.id === id));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id, products]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-xl aspect-square"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const isWishlisted = wishlist.includes(product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews([{ rating: reviewRating, text: reviewText, date: new Date().toLocaleDateString() }, ...reviews]);
    setReviewText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden aspect-square border border-gray-200 dark:border-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-violet-600 cursor-pointer transition-colors ${i === 1 ? "border-violet-600" : ""}`}
              >
                <img
                  src={`${product.image}?random=${i}`}
                  alt="Gallery thumbnail"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 relative">
            <button 
              onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
              className="absolute top-0 right-0 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform"
            >
              <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400 hover:text-pink-500"}`} />
            </button>
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : i === Math.floor(product.rating) && product.rating % 1 !== 0 ? "fill-current opacity-50" : "text-gray-300 dark:text-gray-700"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {product.rating} Rating
              </span>
            </div>
            <p className="text-3xl font-bold mb-6">
              $\{product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 my-6 space-y-6">
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center font-semibold">{quantity}</div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-violet-500/30 transition-all active:scale-[0.98]"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Truck className="w-5 h-5 text-gray-400" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Shield className="w-5 h-5 text-gray-400" />
              <span>2-year extended warranty</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <RotateCcw className="w-5 h-5 text-gray-400" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-16">
        <h2 className="text-3xl font-bold mb-10">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Write a Review */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6 bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star className={`w-8 h-8 ${star <= reviewRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-700"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  placeholder="What did you think of this product?"
                />
              </div>
              <button
                type="submit"
                disabled={!reviewText.trim()}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Review List */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-6">Recent Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-700"}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
