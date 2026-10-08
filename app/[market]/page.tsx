import type { Metadata } from 'next';
import { MarketCode } from '@/types/brand';
import { getMarketConfig } from '@/features/market/config/markets';
import { buildAlternates } from '@/features/market/utils/seo';
import { MarketHero } from '@/features/market/components/MarketHero';
import { HowItWorks } from '@/features/market/components/HowItWorks';
import { CategoryShowcase } from '@/features/service/components/CategoryShowcase';
import { FeaturedServices } from '@/features/service/components/FeaturedServices';
import {
  getCategoryCounts,
  getServicesBySlugs,
  getServiceCount,
} from '@/features/service/api/services.service';

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
  const config = getMarketConfig(marketCode);
  return {
    title: `${config.country} | Branda V2`,
    description: config.heroSubtitle,
    alternates: buildAlternates(marketCode),
  };
}

export default async function MarketHomePage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const marketCode = market as MarketCode;
  const config = getMarketConfig(marketCode);
  const featured = getServicesBySlugs(config.featuredSlugs);
  const counts = getCategoryCounts();
  const serviceCount = getServiceCount();
  const categoryCount = Object.keys(counts).length;

  return (
    <div>
      <MarketHero
        config={config}
        serviceCount={serviceCount}
        categoryCount={categoryCount}
      />
      <CategoryShowcase market={marketCode} counts={counts} />
      <FeaturedServices services={featured} market={marketCode} />
      <HowItWorks />
    </div>
  );
}
