"use client";

import { useParams } from "next/navigation";
import { MarketCode } from "@/types/brand";
import { getMarketConfig } from "@/features/market/config/markets";
import { marketsConfig } from "@/features/market/config/markets";

export const useMarket = () => {
  const params = useParams();
  const marketParam = params.market as string;

  const code: MarketCode = (marketParam &&
    (['ng', 'us', 'uk', 'ca'] as const).includes(marketParam as MarketCode))
    ? (marketParam as MarketCode)
    : 'ng';

  const config = getMarketConfig(code);

  return {
    code,
    config,
    markets: marketsConfig,
  };
};
