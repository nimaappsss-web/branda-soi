"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { MarketCode } from '@/types/brand';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { calculatePricing } from '@/features/cart/utils/pricing';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Price } from '@/components/shared/Price';
import { useMarket } from '@/features/market/hooks/useMarket';

const CHECKOUT_STEPS = ['Cart', 'Checkout', 'Confirmed'] as const;

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
    <div className="container mx-auto px-4 py-8 md:py-10">
      <Link
        href={`/${market}/cart`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Checkout</h1>
        <ol className="flex items-center gap-2">
          {CHECKOUT_STEPS.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  index === 1
                    ? 'bg-primary text-primary-foreground'
                    : index === 0
                      ? 'bg-secondary text-secondary-foreground'
                      : 'border border-border/60 text-muted-foreground'
                }`}
              >
                {index + 1}. {step}
              </span>
              {index < CHECKOUT_STEPS.length - 1 && (
                <span className="h-px w-4 bg-border" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h2 className="font-heading text-lg font-bold">Order Items</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.serviceId}-${item.variantId || ''}`}
                  className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/60 p-3"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      {item.variantLabel && (
                        <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                      )}
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <Price
                      amount={item.unitPrice * item.quantity}
                      marketCode={code}
                      className="font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-muted/60 p-3.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              This is a mock checkout — no payment will be taken and your
              details stay on this device.
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
            <Button
              onClick={handlePlaceOrder}
              className="h-11 w-full text-base"
            >
              Place Order (Mock)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
