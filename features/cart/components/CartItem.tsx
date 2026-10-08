"use client";

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/brand';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Price } from '@/components/shared/Price';
import { useMarket } from '@/features/market/hooks/useMarket';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { code } = useMarket();
  const remove = useCartStore((state) => state.remove);
  const updateQty = useCartStore((state) => state.updateQty);
  const variantKey = item.variantId || '';

  return (
    <div className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/30">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold md:text-base">{item.name}</h3>
            {item.variantLabel && (
              <p className="mt-0.5 text-xs text-muted-foreground">{item.variantLabel}</p>
            )}
            <div className="mt-1.5 text-sm font-medium">
              <Price amount={item.unitPrice} marketCode={code} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(item.serviceId, variantKey)}
            aria-label={`Remove ${item.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>

        <div className="mt-3 inline-flex w-fit items-center gap-1 rounded-xl border border-border/60 bg-background p-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => updateQty(item.serviceId, variantKey, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus />
          </Button>
          <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => updateQty(item.serviceId, variantKey, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
