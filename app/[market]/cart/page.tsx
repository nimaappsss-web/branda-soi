"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold md:text-3xl">Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={`${item.serviceId}-${item.variantId || ''}`} item={item} />
            ))}
          </div>
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
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
