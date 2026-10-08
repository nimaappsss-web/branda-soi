interface WhatIsIncludedProps {
  items: string[];
}

export const WhatIsIncluded = ({ items }: WhatIsIncludedProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">What&apos;s Included</h2>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
