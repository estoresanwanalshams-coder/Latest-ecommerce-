"use client";

import { useState } from "react";
import { fetchSupabaseOrdersByLookup, type OrderRecord } from "@/lib/supabase-orders";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setOrder(null);

    try {
      const matches = await fetchSupabaseOrdersByLookup(email, orderNumber);
      if (matches.length === 0) {
        setMessage("No order found for this Order ID and email.");
      } else {
        setOrder(matches[0]);
      }
    } catch {
      setMessage("Unable to track order. Please verify the details and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-950">Track Order</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Enter your Order ID and email address to check the latest status.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-xl border border-zinc-200 bg-white p-5">
          <label className="light-form-field">
            Order ID
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="ORD-XXXX"
              required
            />
          </label>
          <label className="light-form-field">
            Email Address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <button type="submit" disabled={isLoading} className="btn-soft w-fit px-6 disabled:opacity-70">
            {isLoading ? "Checking..." : "Track"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
            {message}
          </p>
        ) : null}

        {order ? (
          <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Order Number</p>
            <p className="text-lg font-bold text-zinc-950">{order.orderNumber}</p>
            <div className="mt-3 grid gap-2 text-sm text-zinc-700">
              <p>Status: <span className="font-semibold uppercase">{order.status}</span></p>
              <p>Total: AED {order.total}</p>
              <p>Shipping Method: {order.shippingMethod}</p>
              <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
