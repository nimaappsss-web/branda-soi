import { MarketCode } from "@/types/brand";
import { getMarketConfig } from "@/features/market/config/markets";

interface PriceProps {
  amount: number;
  marketCode: MarketCode;
  className?: string;
}

export const Price = ({ amount, marketCode, className }: PriceProps) => {
  const config = getMarketConfig(marketCode);
  const price = amount * config.exchangeRate;

  const formatted = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return <span className={className}>{formatted}</span>;
};
