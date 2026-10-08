"use client";

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/brand';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
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
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold md:text-base">{item.name}</h3>
          {item.variantLabel && (
            <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
          )}
          <div className="mt-1 text-sm">
            <Price amount={item.unitPrice} marketCode={code} />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQty(item.serviceId, variantKey, item.quantity - 1)}
            >
              -
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQty(item.serviceId, variantKey, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(item.serviceId, variantKey)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
