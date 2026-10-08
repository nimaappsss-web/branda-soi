"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { MarketCode } from '@/types/brand';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { calculatePricing } from '@/features/cart/utils/pricing';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Price } from '@/components/shared/Price';
import { useMarket } from '@/features/market/hooks/useMarket';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const market = params.market as MarketCode;
  const { code } = useMarket();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const pricing = calculatePricing(items);

  useEffect(() => {
    if (items.length === 0) {
      router.push(`/${market}/cart`);
    }
  }, [items.length, market, router]);

  const handlePlaceOrder = () => {
    clearCart();
    router.push(`/${market}/checkout/confirmation`);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold md:text-3xl">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold">Order Items</h2>
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.serviceId}-${item.variantId || ''}`} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      {item.variantLabel && (
                        <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                      )}
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <Price amount={item.unitPrice * item.quantity} marketCode={code} />
                  </div>
                </div>
              ))}
            </div>
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
            <Button onClick={handlePlaceOrder} className="w-full">
              Place Order (Mock)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
