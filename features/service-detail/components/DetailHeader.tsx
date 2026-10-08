import { Clock } from 'lucide-react';
import { Service, MarketCode } from '@/types/brand';
import { Price } from '@/components/shared/Price';

interface DetailHeaderProps {
  service: Service;
  market: MarketCode;
}

export const DetailHeader = ({ service, market }: DetailHeaderProps) => {
  const hasDiscount = service.discountPct && service.discountPct > 0;
  const discountedPrice = hasDiscount
    ? service.basePrice * (1 - service.discountPct! / 100)
    : service.basePrice;

  return (
    <div>
      <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
        {service.category}
      </span>

      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        {service.name}
      </h1>

      <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-muted p-4">
        <Price
          amount={discountedPrice}
          marketCode={market}
          className="font-heading text-3xl font-bold"
        />
        {hasDiscount && (
          <span className="text-base text-muted-foreground line-through">
            <Price amount={service.basePrice} marketCode={market} />
          </span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground">
            {service.discountPct}% OFF
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {service.turnaround}
        </span>
      </div>
    </div>
  );
};
