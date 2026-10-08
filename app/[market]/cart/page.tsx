"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketCode } from '@/types/brand';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { calculatePricing } from '@/features/cart/utils/pricing';
import { CartItem } from '@/features/cart/components/CartItem';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { EmptyCart } from '@/features/cart/components/EmptyCart';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const params = useParams();
  const market = params.market as MarketCode;
  const items = useCartStore((state) => state.items);
  const pricing = calculatePricing(items);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart market={market} />
      </div>
    );
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Shopping Cart</h1>
          <p className="mt-2 text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>
        <Link
          href={`/${market}/service`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={`${item.serviceId}-${item.variantId || ''}`} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={pricing.subtotal}
            tax={pricing.tax}
            total={pricing.total}
            market={market}
          />
          <div className="mt-4">
            <Link href={`/${market}/checkout`} className="w-full">
              <Button className="h-11 w-full text-base">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
