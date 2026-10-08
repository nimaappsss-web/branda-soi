"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowRight, Clock, ShoppingCart } from "lucide-react";
import { Service, MarketCode } from "@/types/brand";
import { Price } from "@/components/shared/Price";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  market: MarketCode;
  className?: string;
}

export const ServiceCard = ({ service, market, className }: ServiceCardProps) => {
  const addToCart = useCartStore((state) => state.add);
  const hasDiscount = service.discountPct && service.discountPct > 0;
  const discountedPrice = hasDiscount
    ? service.basePrice * (1 - service.discountPct! / 100)
    : service.basePrice;

  const handleAddToCart = () => {
    addToCart({
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      image: service.images[0],
      unitPrice: discountedPrice,
      quantity: 1,
      category: service.category,
    });
    toast.success(`${service.name} added to cart`);
  };

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors hover:border-primary/40",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={service.images[0]}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
          {service.category}
        </span>
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground">
            {service.discountPct}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary">
          {service.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {service.turnaround}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <Price
            amount={discountedPrice}
            marketCode={market}
            className="font-heading text-xl font-bold"
          />
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              <Price amount={service.basePrice} marketCode={market} />
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/${market}/service/${service.slug}`}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-secondary/60 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${service.name} to cart`}
            title="Add to cart"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-secondary/60 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
