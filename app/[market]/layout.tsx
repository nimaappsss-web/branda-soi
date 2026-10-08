import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MarketCode } from '@/types/brand';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return [
    { market: 'ng' },
    { market: 'us' },
    { market: 'uk' },
    { market: 'ca' },
  ];
};

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const validMarkets: MarketCode[] = ['ng', 'us', 'uk', 'ca'];
  if (!validMarkets.includes(market as MarketCode)) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
