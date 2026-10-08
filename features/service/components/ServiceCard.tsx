"use client";

import Link from "next/link";
import Image from "next/image";
import { Service, MarketCode } from "@/types/brand";
import { Price } from "@/components/shared/Price";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    <Card className={cn("flex flex-col", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={service.images[0]}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs text-destructive-foreground">
            {service.discountPct}% OFF
          </span>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="line-clamp-2 text-base font-semibold">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <Price amount={discountedPrice} marketCode={market} className="text-lg font-bold" />
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              <Price amount={service.basePrice} marketCode={market} />
            </span>
          )}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">{service.turnaround}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/${market}/service/${service.slug}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
