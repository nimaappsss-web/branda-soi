"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarketCode } from "@/types/brand";
import { marketsConfig } from "@/features/market/config/markets";

export const MarketSelector = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentMarket = params.market as MarketCode;

  const handleChange = (value: string | null) => {
    if (!value) return;
    const market = value as MarketCode;
    const segments = pathname.split('/');
    if (segments[1] && ['ng', 'us', 'uk', 'ca'].includes(segments[1] as MarketCode)) {
      segments[1] = market;
    } else {
      segments.splice(1, 0, market);
    }
    const newPath = segments.join('/') || `/${market}`;
    router.push(newPath);
  };

  return (
    <Select value={currentMarket} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(marketsConfig).map((m) => (
          <SelectItem key={m.code} value={m.code}>
            {m.country} ({m.currency})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
