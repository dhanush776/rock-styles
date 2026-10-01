"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Order } from "@/types";
import { money } from "@/lib/store";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const email =
          typeof window !== "undefined"
            ? localStorage.getItem("rock_styles_email")
            : null;

        if (!email) {
          setOrders([]);
          return;
        }

        const q = query(
          collection(db, "orders"),
          where("email", "==", email)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Order
        );

        setOrders(data);
      } catch (error) {
        // Technical Firebase error is kept in console only.
        console.error("Orders loading error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="page container">
      <span className="eyebrow">TRACK YOUR ORDERS</span>

      <h1 className="page-title">Orders</h1>

      {loading ? (
        <div className="panel empty">
          Loading your orders...
        </div>
      ) : orders.length ? (
        <div className="summary">
          {orders.map((order) => (
            <div className="panel" key={order.id}>
              <div className="row">
                <b>
                  #{order.id.slice(0, 8).toUpperCase()}
                </b>

                <span className="status">
                  {order.status || "Processing"}
                </span>
              </div>

              <p>
                {order.items
                  ?.map(
                    (item) =>
                      `${item.name} × ${item.qty}`
                  )
                  .join(", ")}
              </p>

              <div className="row">
                <span>{order.address}</span>

                <strong>
                  {money(order.total)}
                </strong>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel empty">
          <h3>No orders yet</h3>

          <p>
            Your orders will appear here after you
            complete your first purchase.
          </p>

          <p>
            Need help? WhatsApp us at{" "}
            <strong>+91 9003392116</strong>.
          </p>
        </div>
      )}
    </div>
  );
}