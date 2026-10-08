import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { getMarketConfig } from '@/features/market/config/markets';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const generateStaticParams = () => {
  return [
    { market: 'ng' },
    { market: 'us' },
    { market: 'uk' },
    { market: 'ca' },
  ];
};

export default async function MarketHomePage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config = getMarketConfig(market as MarketCode);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          {config.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {config.heroSubtitle}
        </p>
        <div className="mt-8">
          <Link href={`/${market}/service`}>
            <Button size="lg">Browse Services</Button>
          </Link>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold">Featured Services</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.featuredSlugs.map((slug) => (
            <Card key={slug}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">{slug.replace(/-/g, ' ').toUpperCase()}</h3>
                <Link href={`/${market}/service/${slug}`} className="mt-2 inline-block">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
