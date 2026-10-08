"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
  initial?: number;
}

export const QuantitySelector = ({ initial = 1 }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initial);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Quantity</h2>
      <div className="mt-3 inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card p-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={decrease}
          aria-label="Decrease quantity"
        >
          <Minus />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="h-8 w-16 border-0 bg-transparent text-center focus-visible:ring-0"
          min={1}
          aria-label="Quantity"
        />
        <Button
          variant="outline"
          size="icon-sm"
          onClick={increase}
          aria-label="Increase quantity"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};
