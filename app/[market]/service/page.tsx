import type { Metadata } from 'next';
import { MarketCode, Category, UseCase, Industry } from '@/types/brand';
import { getServices, getAllServicesForListing } from '@/features/service/api/services.service';
import { buildAlternates } from '@/features/market/utils/seo';
import { ServiceListHeader } from '@/features/service/components/ServiceListHeader';
import { DesktopServiceList } from '@/features/service/components/DesktopServiceList';
import { MobileServiceList } from '@/features/service/components/MobileServiceList';
import { EmptyState } from '@/components/others/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const generateStaticParams = () => {
  return [
    { market: 'ng' },
    { market: 'us' },
    { market: 'uk' },
    { market: 'ca' },
  ];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market } = await params;
  const marketCode = market as MarketCode;
  return {
    title: 'Services | Branda V2',
    description:
      'Browse digital, gift, create, studio and print branding services. Filter by category, use case and industry.',
    alternates: buildAlternates(marketCode, '/service'),
  };
}

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
  const hasActiveFilters = Boolean(sp.q || sp.category || sp.useCase || sp.industry);

  return (
    <div>
      <section className="border-b border-border/60">
        <div className="container px-4 py-10 md:py-14">
          <Link
            href={`/${marketCode}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Services</h1>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Browse digital, gift, create, studio and print services — filter
                down to the exact deliverable you need.
              </p>
            </div>
            <span className="rounded-full border border-border/60 bg-card px-4 py-1.5 text-sm font-semibold">
              {paginated.total} {paginated.total === 1 ? 'result' : 'results'}
            </span>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8 md:py-10">
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
              description={
                hasActiveFilters
                  ? 'Try adjusting or clearing your filters.'
                  : 'Nothing matches this combination yet.'
              }
              action={
                <Link href={`/${marketCode}/service`}>
                  <Button variant="outline">{hasActiveFilters ? 'Clear Filters' : 'Browse all services'}</Button>
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
    </div>
  );
}
