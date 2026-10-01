"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Category = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  active?: boolean;
  order?: number;
};

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-fallback" />

      <div className="container hero-content">
        <span className="hero-kicker">
          TAMIL STREETWEAR
        </span>

        <h1>
          WEAR YOUR
          <br />
          BETTER VERSION.
        </h1>

        <p>
          Premium streetwear made for bold personalities.
          Discover oversized fits, gym styles, polos and
          everyday essentials.
        </p>

        <div className="hero-actions">
          <Link
            href="/categories"
            className="btn btn-light"
          >
            SHOP NOW
          </Link>

          <Link
            href="/categories"
            className="btn btn-ghost-light"
          >
            VIEW COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        /*
         * Only filter by active.
         *
         * We intentionally do NOT use:
         *
         * orderBy("order", "asc")
         *
         * together with where(), because that requires
         * a Firestore composite index.
         *
         * We sort the result locally instead.
         */

        const categoriesRef = collection(
          db,
          "categories"
        );

        const q = query(
          categoriesRef,
          where("active", "==", true)
        );

        const snapshot = await getDocs(q);

        if (!mounted) return;

        const data: Category[] = snapshot.docs.map(
          (item) => ({
            id: item.id,
            ...item.data(),
          }) as Category
        );

        // Sort categories locally by order.
        data.sort((a, b) => {
          const orderA =
            typeof a.order === "number"
              ? a.order
              : 999999;

          const orderB =
            typeof b.order === "number"
              ? b.order
              : 999999;

          return orderA - orderB;
        });

        setCategories(data);
      } catch (error) {
        console.error(
          "Category loading failed:",
          error
        );

        if (mounted) {
          setCategories([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <span className="eyebrow">
            SHOP THE DROP
          </span>

          <h2 className="display">
            Built for the bold.
          </h2>
        </div>

        <Link href="/categories">
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="category-loading">
          Loading categories...
        </div>
      ) : categories.length === 0 ? (
        <div className="category-empty">
          No categories available.
        </div>
      ) : (
        <div className="cat-grid">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories?type=${encodeURIComponent(
                category.slug
              )}`}
              className={`cat-card cat-${index % 6}`}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="cat-image"
                />
              )}

              <div className="cat-overlay" />

              <div className="cat-content">
                <span>{category.name}</span>

                <small>
                  EXPLORE →
                </small>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}