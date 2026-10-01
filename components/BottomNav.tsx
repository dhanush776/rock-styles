"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid2X2,
  ShoppingBag,
  Heart,
  User,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Grid2X2,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    name: "Account",
    href: "/account",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${active ? "active" : ""}`}
          >
            <Icon size={21} strokeWidth={active ? 2.5 : 2} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}