"use client";

import { useAppContext } from "@/providers/AppProvider";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useAppContext();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let discount = 0;
  let shipping = subtotal > 50 || appliedCoupon === "FREESHIP" ? 0 : 15;

  if (appliedCoupon === "SAVE10") {
    discount = subtotal * 0.1;
  }

  const tax = (subtotal - discount) * 0.08; // 8% mock tax
  const total = subtotal - discount + tax + shipping;

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10" || couponCode === "FREESHIP") {
      setAppliedCoupon(couponCode);
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Looks like you haven't added anything to your cart yet. Discover our
          premium selection and find something you love.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition shadow-lg shadow-violet-500/30"
        >
          Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row gap-6"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="w-full sm:w-32 h-32 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold">
                          <Link
                            href={`/products/${item.id}`}
                            className="hover:text-violet-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.category}
                        </p>
                      </div>
                      <p className="font-bold text-lg">
                        $\{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-auto flex justify-between items-center pt-4">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="sr-only sm:not-sr-only text-sm font-medium">
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-pink-600 dark:text-pink-400">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Estimated Tax
                </span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-extrabold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Gift card or discount code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SAVE10"
                  className="flex-1 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 text-sm font-medium rounded-lg transition"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  Coupon "{appliedCoupon}" applied!
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="underline ml-1"
                  >
                    Remove
                  </button>
                </p>
              )}
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/30 transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
