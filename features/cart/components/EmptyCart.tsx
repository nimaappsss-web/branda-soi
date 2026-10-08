import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartProps {
  market: MarketCode;
}

export const EmptyCart = ({ market }: EmptyCartProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingCart className="h-16 w-16 text-muted-foreground" />
      <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
      <p className="mt-2 text-center text-muted-foreground">
        Start adding services to build your branding solution
      </p>
      <Link href={`/${market}/service`} className="mt-6">
        <Button>Browse Services</Button>
      </Link>
    </div>
  );
};
