"use client";

import { useState } from "react";
import { Service } from '@/types/brand';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceOptionsProps {
  service: Service;
}

export const ServiceOptions = ({ service }: ServiceOptionsProps) => {
  const [selected, setSelected] = useState(service.options?.[0]?.id || "");

  if (!service.options || service.options.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Options</h2>
      <RadioGroup value={selected} onValueChange={setSelected} className="mt-3 space-y-2">
        {service.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="text-sm">
              {option.label}
              {option.priceDelta !== undefined && option.priceDelta > 0 && (
                <span className="ml-2 text-muted-foreground">(+₦{option.priceDelta.toLocaleString()})</span>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
