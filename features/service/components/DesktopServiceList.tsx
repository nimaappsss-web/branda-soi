import { Service, MarketCode } from '@/types/brand';
import { ServiceGrid } from './ServiceGrid';
import { Pagination } from './Pagination';

interface DesktopServiceListProps {
  services: Service[];
  market: MarketCode;
  totalPages: number;
  currentPage: number;
}

export const DesktopServiceList = ({
  services,
  market,
  totalPages,
  currentPage,
}: DesktopServiceListProps) => {
  return (
    <div className="space-y-6">
      <ServiceGrid services={services} market={market} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};
