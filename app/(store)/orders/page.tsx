"use client";

import { useAppContext } from "@/providers/AppProvider";
import { Package, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Order } from "@/lib/mockData";

export default function OrdersPage() {
  const { orders } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedOrder(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-gray-500 mb-8">
          You haven't placed any orders. Start exploring our collection!
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Orders List */}
      <div className={`flex-1 ${selectedOrder ? "hidden md:block" : "block"}`}>
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`border rounded-xl p-5 cursor-pointer transition-all ${selectedOrder?.id === order.id ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10" : "border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700"}`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-lg">{order.id}</div>
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </div>
              </div>
              <div className="flex justify-between items-end text-sm text-gray-500 dark:text-gray-400">
                <div>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                  <p className="mt-1">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    $\{order.total.toFixed(2)}
                  </p>
                  <span className="flex items-center text-violet-600 dark:text-violet-400 font-medium mt-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Detail View */}
      {selectedOrder && (
        <div className="md:w-2/5 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="md:hidden text-sm text-violet-600 font-medium"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Expected Progress
                </h3>
                <div className="relative pt-2 pb-6 px-2">
                  <div className="absolute left-[15px] top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                  <div className="space-y-6 relative">
                    {[
                      { label: "Processing", key: "Processing" },
                      { label: "Shipped", key: "Shipped" },
                      { label: "Delivered", key: "Delivered" },
                    ].map((step, idx, arr) => {
                      const statusIndex = [
                        "Processing",
                        "Shipped",
                        "Delivered",
                      ].indexOf(selectedOrder.status as string);
                      const isCompleted = idx <= statusIndex;
                      const isCurrent = idx === statusIndex;
                      return (
                        <div key={step.key} className="flex gap-4 items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white dark:bg-gray-900 z-10 ${isCompleted ? "border-violet-600" : "border-gray-300 dark:border-gray-700"}`}
                          >
                            {isCompleted && (
                              <div className="w-2 h-2 rounded-full bg-violet-600"></div>
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${isCurrent ? "text-violet-600 dark:text-violet-400" : isCompleted ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-600"}`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {selectedOrder.trackingNumber && (
                  <p className="text-sm text-violet-600 mt-2">
                    Tracking: {selectedOrder.trackingNumber}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Items
                </h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 text-sm">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        <p className="font-bold mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Paid</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex gap-3 text-sm">
                <button className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium rounded-lg transition text-center">
                  Invoice
                </button>
                <button className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium rounded-lg transition text-center">
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Processing":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "Shipped":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Delivered":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
}

function getStatusDot(status: string) {
  switch (status) {
    case "Processing":
      return "bg-blue-500";
    case "Shipped":
      return "bg-yellow-500";
    case "Delivered":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}
