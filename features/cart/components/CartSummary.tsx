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
    <div className="rounded-2xl border border-border/60 bg-card p-5 lg:sticky lg:top-24">
      <h2 className="font-heading text-lg font-bold">Order Summary</h2>
      <div className="mt-5 space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <Price amount={subtotal} marketCode={market} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax ({(TAX_RATE * 100).toFixed(1)}%)</span>
          <Price amount={tax} marketCode={market} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-secondary p-3.5">
          <span className="font-semibold">Total</span>
          <Price amount={total} marketCode={market} className="font-heading text-xl font-bold" />
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Prices shown in your local currency. Delivery timelines are listed on
        each service.
      </p>
    </div>
  );
};
