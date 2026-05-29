"use client";

import { useEffect, useState } from "react";
import {
  fetchSupabaseCustomers,
  type CustomerRecord,
} from "@/lib/supabase-customers";

export function AdminCustomersPanel() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setCustomers(await fetchSupabaseCustomers().catch(() => []));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="page-shell border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Customers
        </p>
        <h2 className="mt-3 text-3xl font-bold text-zinc-950">Registered users</h2>
        <div className="mt-7 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-zinc-500" colSpan={4}>
                    No registered customers yet.
                  </td>
                </tr>
              ) : null}
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {customer.fullName}
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{customer.email}</td>
                  <td className="px-4 py-3 text-zinc-700">{customer.phone || "-"}</td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
