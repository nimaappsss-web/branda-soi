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
      <h1 className="text-2xl font-bold md:text-3xl">{service.name}</h1>
      <p className="mt-2 text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <Price amount={discountedPrice} marketCode={market} className="text-2xl font-bold" />
        {hasDiscount && (
          <span className="text-lg text-muted-foreground line-through">
            <Price amount={service.basePrice} marketCode={market} />
          </span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-destructive px-2 py-1 text-xs text-destructive-foreground">
            {service.discountPct}% OFF
          </span>
        )}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">Turnaround: {service.turnaround}</div>
    </div>
  );
};
