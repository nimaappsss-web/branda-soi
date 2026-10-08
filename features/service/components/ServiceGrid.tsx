import { Service, MarketCode } from '@/types/brand';
import { ServiceCard } from './ServiceCard';
import { cn } from '@/lib/utils';

interface ServiceGridProps {
  services: Service[];
  market: MarketCode;
  className?: string;
}

export const ServiceGrid = ({ services, market, className }: ServiceGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} market={market} />
      ))}
    </div>
  );
};
