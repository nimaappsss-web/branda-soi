import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const marketCode = market as MarketCode;

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-12 w-12" strokeWidth={3} />
      </span>
      <h1 className="mt-7 text-3xl font-bold tracking-tight md:text-4xl">
        Order Confirmed!
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
        Thank you for your order. Your mock order has been received — we&apos;ll
        take it from here.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/${marketCode}/service`}>
          <Button size="lg" className="h-11 px-7">
            Continue Shopping
          </Button>
        </Link>
        <Link href={`/${marketCode}`}>
          <Button size="lg" variant="outline" className="h-11 bg-card px-7">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
