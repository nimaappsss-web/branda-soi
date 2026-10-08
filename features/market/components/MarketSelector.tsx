"use client";

import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BottomDrawer } from "@/components/others/BottomDrawer";
import { cn } from "@/lib/utils";
import { MarketCode } from "@/types/brand";
import { marketsConfig } from "@/features/market/config/markets";

interface MarketSelectorProps {
  onSelect?: () => void;
}

export const MarketSelector = ({ onSelect }: MarketSelectorProps) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentMarket = params.market as MarketCode;
  const [open, setOpen] = useState(false);

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

  const current = marketsConfig[currentMarket];

  return (
    <>
      <div className="hidden md:block">
        <Select value={currentMarket} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(marketsConfig).map((m) => (
              <SelectItem key={m.code} value={m.code}>
                {m.flag} {m.country} ({m.currency})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Select market (current: ${current.country})`}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border/60 py-3.5 text-[15px] font-semibold transition-colors active:bg-primary-foreground/10 md:hidden"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.country}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      <BottomDrawer open={open} onOpenChange={setOpen} title="Select market">
        <div className="flex flex-col gap-1">
          {Object.values(marketsConfig).map((m) => {
            const active = m.code === currentMarket;
            return (
              <button
                key={m.code}
                type="button"
                onClick={() => {
                  handleChange(m.code);
                  setOpen(false);
                  onSelect?.();
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <span>
                  {m.flag} {m.country}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    active
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {m.currency}
                </span>
              </button>
            );
          })}
        </div>
      </BottomDrawer>
    </>
  );
};
