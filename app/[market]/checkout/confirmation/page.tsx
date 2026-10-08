import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const marketCode = market as MarketCode;

  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-12">
      <CheckCircle className="h-16 w-16 text-green-600" />
      <h1 className="mt-4 text-2xl font-bold md:text-3xl">Order Confirmed!</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Thank you for your order. Your mock order has been received.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/${marketCode}/service`}>
          <Button>Continue Shopping</Button>
        </Link>
        <Link href={`/${marketCode}`}>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
