"use client";

import { useState } from "react";
import { Service, MarketCode } from "@/types/brand";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Price } from "@/components/shared/Price";

interface ServiceOptionsProps {
  service: Service;
  market: MarketCode;
}

export const ServiceOptions = ({ service, market }: ServiceOptionsProps) => {
  const [selected, setSelected] = useState(service.options?.[0]?.id || "");

  if (!service.options || service.options.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Options</h2>
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="mt-3 grid gap-2 sm:grid-cols-2"
      >
        {service.options.map((option) => (
          <Label
            key={option.id}
            htmlFor={option.id}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-3.5 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:"
          >
            <span className="flex items-center gap-2.5">
              <RadioGroupItem value={option.id} id={option.id} />
              <span className="text-sm font-medium">{option.label}</span>
            </span>
            {option.priceDelta !== undefined && option.priceDelta > 0 && (
              <span className="text-xs font-semibold text-primary">
                +<Price amount={option.priceDelta} marketCode={market} />
              </span>
            )}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};
