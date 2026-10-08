import { Service, MarketCode } from '@/types/brand';
import { ServiceGrid } from '@/features/service/components/ServiceGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface RelatedServicesProps {
  services: Service[];
  market: MarketCode;
}

export const RelatedServices = ({ services, market }: RelatedServicesProps) => {
  if (services.length === 0) return null;

  return (
    <div>
      <SectionHeading
        eyebrow="You may also need"
        title="Related & complementary services"
        description="Enhance your order with these complementary services."
      />
      <div className="mt-8">
        <ServiceGrid services={services} market={market} />
      </div>
    </div>
  );
};
