"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addCart, money } from "@/lib/store";
import type { Product } from "@/types";
import { MinusIcon, PlusIcon } from "@/components/Icons";
import Link from "next/link";

export default function ProductClient({ id }: { id: string }) {
  const [p, setP] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getDoc(doc(db, "products", id)).then((s) => {
      if (s.exists()) {
        setP({
          id: s.id,
          ...s.data(),
        } as Product);
      }
    });
  }, [id]);

  if (!p) {
    return (
      <div className="page container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  const img = p.image || p.images?.[0] || "/placeholder.svg";

  return (
    <div className="container product-detail">
      <div>
        <img
          className="detail-image"
          src={img}
          alt={p.name}
        />
      </div>

      <div className="detail-info">
        <span className="detail-cat">{p.category}</span>

        <h1>{p.name}</h1>

        <div className="detail-price">
          {money(p.price)}
        </div>

        <p>
          {p.description ||
            "Premium Rock Styles streetwear built for everyday confidence."}
        </p>

        <label className="field-label">SELECT SIZE</label>

        <div className="sizes">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <button
              key={s}
              className={`size ${size === s ? "active" : ""}`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="qty-row">
          <div className="qty-control">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <MinusIcon />
            </button>

            <span>{qty}</span>

            <button onClick={() => setQty(qty + 1)}>
              <PlusIcon />
            </button>
          </div>

          <span>
            {p.stock > 0
              ? `${p.stock} in stock`
              : "Out of stock"}
          </span>
        </div>

        <div className="two">
          <button
            className="btn"
            disabled={!p.stock}
            onClick={() => addCart(p, size, qty)}
          >
            ADD TO BAG
          </button>

          <Link className="btn btn-outline" href="/cart">
            VIEW BAG
          </Link>
        </div>
      </div>
    </div>
  );
}