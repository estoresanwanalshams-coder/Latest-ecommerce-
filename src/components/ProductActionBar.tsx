"use client";

import Link from "next/link";
import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/lib/products";

type ProductActionBarProps = {
  product: Product;
};

export function ProductActionBar({ product }: ProductActionBarProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="inline-flex w-fit items-center border border-zinc-300 bg-white">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          className="h-10 w-10 border-r border-zinc-300 text-lg font-semibold"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="flex h-10 min-w-14 items-center justify-center text-sm font-semibold">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((current) => current + 1)}
          className="h-10 w-10 border-l border-zinc-300 text-lg font-semibold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <AddToCartButton product={product} quantity={quantity} className="btn-soft justify-center" />
        <Link
          href={`/inquiry/${product.slug}?qty=${quantity}`}
          className="btn-soft justify-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
