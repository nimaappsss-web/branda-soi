import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketCode } from '@/types/brand';
import { getServiceBySlug, getRelatedServices } from '@/features/service/api/services.service';
import { buildAlternates } from '@/features/market/utils/seo';
import { notFound } from 'next/navigation';
import { ImageGallery } from '@/features/service-detail/components/ImageGallery';
import { DetailHeader } from '@/features/service-detail/components/DetailHeader';
import { WhatIsIncluded } from '@/features/service-detail/components/WhatIsIncluded';
import { ServiceOptions } from '@/features/service-detail/components/ServiceOptions';
import { QuantitySelector } from '@/features/service-detail/components/QuantitySelector';
import { CartActions } from '@/features/service-detail/components/CartActions';
import { RelatedServices } from '@/features/service-detail/components/RelatedServices';

export async function generateStaticParams() {
  const services = await import('@/data/mock-services').then((m) => m.mockServices);
  const markets = ['ng', 'us', 'uk', 'ca'];
  return markets.flatMap((market) =>
    services.map((s) => ({ market, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}) {
  const { slug, market } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.name} | Branda V2 (${market.toUpperCase()})`,
    description: service.description,
    alternates: buildAlternates(market as MarketCode, `/service/${slug}`),
    openGraph: {
      title: service.name,
      description: service.description,
      images: [service.images[0]],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}) {
  const { slug, market } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const related = getRelatedServices(service);
  const marketCode = market as MarketCode;

  return (
    <div className="container px-4 py-8 md:py-10">
      <Link
        href={`/${marketCode}/service`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All services
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ImageGallery images={service.images} name={service.name} />
        </div>

        <div className="space-y-6">
          <DetailHeader service={service} market={marketCode} />
          <WhatIsIncluded items={service.whatIsIncluded} />
          <ServiceOptions service={service} market={marketCode} />
          <QuantitySelector />
          <CartActions service={service} market={marketCode} />
        </div>
      </div>

      <div className="mt-16 border-t border-border/60 pt-12">
        <RelatedServices services={related} market={marketCode} />
      </div>
    </div>
  );
}
