"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Service, MarketCode } from "@/types/brand";
import { Price } from "@/components/shared/Price";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  market: MarketCode;
  className?: string;
}

export const ServiceCard = ({ service, market, className }: ServiceCardProps) => {
  const hasDiscount = service.discountPct && service.discountPct > 0;
  const discountedPrice = hasDiscount
    ? service.basePrice * (1 - service.discountPct! / 100)
    : service.basePrice;

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

        <Link
          href={`/${market}/service/${service.slug}`}
          className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-secondary/60 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
