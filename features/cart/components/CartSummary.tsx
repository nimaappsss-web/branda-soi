import { MarketCode } from '@/types/brand';
import { Price } from '@/components/shared/Price';
import { TAX_RATE } from '@/features/cart/utils/pricing';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  market: MarketCode;
}

export const CartSummary = ({ subtotal, tax, total, market }: CartSummaryProps) => {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <Price amount={subtotal} marketCode={market} />
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax ({(TAX_RATE * 100).toFixed(1)}%)</span>
          <Price amount={tax} marketCode={market} />
        </div>
        <div className="flex justify-between border-t pt-2 text-base font-semibold">
          <span>Total</span>
          <Price amount={total} marketCode={market} />
        </div>
      </div>
    </div>
  );
};
