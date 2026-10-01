import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductClient id={id} />;
}