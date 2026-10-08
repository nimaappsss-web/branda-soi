import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartProps {
  market: MarketCode;
}

export const EmptyCart = ({ market }: EmptyCartProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className="flex size-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
        <ShoppingCart className="h-9 w-9" />
      </span>
      <h2 className="mt-6 font-heading text-2xl font-bold">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-center leading-relaxed text-muted-foreground">
        Start adding services to build your branding solution — digital, gifts,
        print and more.
      </p>
      <Link href={`/${market}/service`} className="mt-7">
        <Button size="lg" className="h-11 px-7">
          Browse Services
        </Button>
      </Link>
    </div>
  );
};
