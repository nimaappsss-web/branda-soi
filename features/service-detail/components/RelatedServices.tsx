import { Service, MarketCode } from '@/types/brand';
import { ServiceGrid } from '@/features/service/components/ServiceGrid';

interface RelatedServicesProps {
  services: Service[];
  market: MarketCode;
}

export const RelatedServices = ({ services, market }: RelatedServicesProps) => {
  if (services.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold">Related & Complementary Services</h2>
      <p className="mt-2 text-muted-foreground">
        Enhance your order with these complementary services
      </p>
      <div className="mt-6">
        <ServiceGrid services={services} market={market} />
      </div>
    </div>
  );
};
