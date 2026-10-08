"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MarketCode } from "@/types/brand";
import { MarketSelector } from "@/features/market/components/MarketSelector";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { ShoppingCart } from "lucide-react";

export const Header = () => {
  const params = useParams();
  const market = params.market as MarketCode;
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href={`/${market}`}
            className="text-lg font-semibold hover:text-primary"
          >
            Branda V2
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link
              href={`/${market}/service`}
              className="text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <MarketSelector />
          <Link
            href={`/${market}/cart`}
            className="relative flex items-center gap-2 text-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
