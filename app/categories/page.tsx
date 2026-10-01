"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";

function CategoriesContent() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "";
  const q = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const productsQuery = query(
          collection(db, "products"),
          where("active", "==", true)
        );

        const snapshot = await getDocs(productsQuery);

        if (!mounted) return;

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(data);
      } catch (error) {
        console.error("Products loading failed:", error);

        if (mounted) {
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const searchText = q.trim().toLowerCase();
    const selectedType = type.trim().toLowerCase();

    return products.filter((product) => {
      const productName = String(product.name || "").toLowerCase();
      const productCategory = String(product.category || "").toLowerCase();

      const searchableText = `${productName} ${productCategory}`;

      // Search filter
      if (searchText && !searchableText.includes(searchText)) {
        return false;
      }

      // Category filter
      if (selectedType) {
        const normalizedType = selectedType.replace(/-/g, " ");

        if (!productCategory.includes(normalizedType)) {
          return false;
        }
      }

      return true;
    });
  }, [products, q, type]);

  const title = type
    ? type.replace(/-/g, " ")
    : q
      ? `Search: ${q}`
      : "All products";

  const categories = [
    "Oversized T-Shirts",
    "Gym Fits",
    "Attitude Wear",
    "College Outfits",
    "Formal Fits",
    "Polo T-Shirts",
  ];

  return (
    <main className="page container">
      {/* HEADER */}
      <div className="section-head">
        <div>
          <span className="eyebrow">THE COLLECTION</span>

          <h1 className="page-title">
            {title}
          </h1>
        </div>

        <Link href="/" className="btn btn-outline">
          HOME
        </Link>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="toolbar">
        <Link href="/categories" className="btn">
          ALL
        </Link>

        {categories.map((category) => {
          const slug = category
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={category}
              href={`/categories?type=${encodeURIComponent(slug)}`}
              className="btn btn-outline"
            >
              {category}
            </Link>
          );
        })}
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <div className="loading">
          Loading collection...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="category-empty">
          <h2>No products found</h2>

          <p>
            Try another category or search term.
          </p>

          <Link
            href="/categories"
            className="btn"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </main>
  );
}

/*
  IMPORTANT:
  useSearchParams() must be inside Suspense
  for Next.js production/build prerendering.
*/

export default function Categories() {
  return (
    <Suspense
      fallback={
        <main className="page container">
          <div className="loading">
            Loading collection...
          </div>
        </main>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}