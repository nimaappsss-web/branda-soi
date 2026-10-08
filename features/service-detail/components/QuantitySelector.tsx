"use client";

import { useState } from "react";
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
      <h2 className="text-lg font-semibold">Quantity</h2>
      <div className="mt-2 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={decrease}>
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="w-20"
          min={1}
        />
        <Button variant="outline" size="sm" onClick={increase}>
          +
        </Button>
      </div>
    </div>
  );
};
