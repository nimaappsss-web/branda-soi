import { MarketCode, Category, UseCase, Industry } from '@/types/brand';
import { getAllServicesForListing, getServices } from '@/features/service/api/services.service';
import { ServiceListHeader } from '@/features/service/components/ServiceListHeader';
import { DesktopServiceList } from '@/features/service/components/DesktopServiceList';
import { MobileServiceList } from '@/features/service/components/MobileServiceList';
import { EmptyState } from '@/components/others/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const generateStaticParams = () => {
  return [
    { market: 'ng' },
    { market: 'us' },
    { market: 'uk' },
    { market: 'ca' },
  ];
};

export default async function ServiceListPage({
  params,
  searchParams,
}: {
  params: Promise<{ market: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    useCase?: string;
    industry?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const { market } = await params;
  const sp = await searchParams;
  const marketCode = market as MarketCode;

  const filters = {
    q: sp.q,
    category: sp.category as Category | undefined,
    useCase: sp.useCase as UseCase | undefined,
    industry: sp.industry as Industry | undefined,
    sort: sp.sort as 'price-asc' | 'price-desc' | 'popularity-desc' | undefined,
    page: sp.page ? parseInt(sp.page) : 1,
    limit: 12,
  };

  const paginated = getServices(filters);
  const allFiltered = getAllServicesForListing(filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Services</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our services across Digital, Gifts, Create, Studio and Prints
        </p>
      </div>

      <ServiceListHeader
        search={sp.q}
        category={sp.category as Category | undefined}
        useCase={sp.useCase as UseCase | undefined}
        industry={sp.industry as Industry | undefined}
        sort={sp.sort}
      />

      <div className="mt-8">
        {paginated.data.length === 0 ? (
          <EmptyState
            title="No services found"
            description="Try adjusting your filters or search terms."
            action={
              <Link href={`/${marketCode}/service`}>
                <Button>Clear Filters</Button>
              </Link>
            }
          />
        ) : (
          <>
            <div className="md:hidden">
              <MobileServiceList
                initialServices={paginated.data}
                market={marketCode}
                allServices={allFiltered}
              />
            </div>
            <div className="hidden md:block">
              <DesktopServiceList
                services={paginated.data}
                market={marketCode}
                totalPages={paginated.totalPages}
                currentPage={paginated.page}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
