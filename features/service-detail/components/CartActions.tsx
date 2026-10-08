"use client";

import { useRouter } from 'next/navigation';
import { Service, MarketCode } from '@/types/brand';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/features/cart/store/useCartStore';

interface CartActionsProps {
  service: Service;
  market: MarketCode;
}

export const CartActions = ({ service, market }: CartActionsProps) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.add);

  const hasDiscount = service.discountPct && service.discountPct > 0;
  const unitPrice = hasDiscount
    ? service.basePrice * (1 - service.discountPct! / 100)
    : service.basePrice;

  const handleAddToCart = () => {
    addToCart({
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      image: service.images[0],
      unitPrice,
      quantity: 1,
      category: service.category,
    });
  };

  const handleOrderNow = () => {
    handleAddToCart();
    router.push(`/${market}/cart`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button onClick={handleAddToCart} className="flex-1" variant="outline">
        Add to Cart
      </Button>
      <Button onClick={handleOrderNow} className="flex-1">
        Order Now
      </Button>
    </div>
  );
};
