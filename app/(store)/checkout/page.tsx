"use client";

import { useAppContext } from "@/providers/AppProvider";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart, addOrder } = useAppContext();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      addOrder({
        id: orderId,
        date: new Date().toISOString(),
        status: "Processing",
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
      });
      clearCart();
      setOrderComplete(orderId);
      setIsProcessing(false);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Thank you for your purchase. Your order{" "}
          <strong className="text-gray-900 dark:text-white">
            #{orderComplete}
          </strong>{" "}
          is processing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/orders"
            className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
          >
            View Order History
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-12 text-center">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
        {/* Forms Container */}
        <div className="flex-1">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -z-10 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-violet-600 -z-10 -translate-y-1/2 transition-all duration-300"
              style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
            ></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? "bg-violet-600 border-violet-600 text-white" : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-400"}`}
              >
                1
              </div>
              <span
                className={`text-xs mt-2 font-medium ${step >= 1 ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
              >
                Shipping
              </span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? "bg-violet-600 border-violet-600 text-white" : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-400"}`}
              >
                2
              </div>
              <span
                className={`text-xs mt-2 font-medium ${step >= 2 ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
              >
                Payment
              </span>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 3 ? "bg-violet-600 border-violet-600 text-white" : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-400"}`}
              >
                3
              </div>
              <span
                className={`text-xs mt-2 font-medium ${step >= 3 ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
              >
                Review
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="border border-violet-200 dark:border-violet-900/50 bg-violet-50 dark:bg-violet-900/10 rounded-xl p-4 mb-6 relative hover:border-violet-400 cursor-pointer transition">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Credit Card
                    </span>
                    <div className="w-5 h-5 rounded-full border-4 border-violet-600"></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-500">
                        Card Number
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-500">
                          Expiry
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-500">
                          CVC
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="123"
                          className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-8 py-4 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="mt-8 flex-1 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition"
                  >
                    Review Order
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-sm">
                  <div className="mb-4">
                    <span className="font-semibold block mb-1">
                      Shipping To:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      John Doe
                      <br />
                      123 Main St, New York, NY 10001
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold block mb-1">
                      Paying With:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      Credit Card ending in 4242
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isProcessing}
                    className="mt-8 py-4 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold transition disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="mt-8 flex-1 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/30 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing
                      ? "Processing Order..."
                      : `Pay $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Small Summary Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Order Summary
            </h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
