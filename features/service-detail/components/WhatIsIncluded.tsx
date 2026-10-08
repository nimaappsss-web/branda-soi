import { Check } from "lucide-react";

interface WhatIsIncludedProps {
  items: string[];
}

export const WhatIsIncluded = ({ items }: WhatIsIncludedProps) => {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <h2 className="text-lg font-bold">What&apos;s Included</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
