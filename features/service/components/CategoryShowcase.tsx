import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category, MarketCode } from "@/types/brand";
import { CATEGORIES, CATEGORY_ICONS } from "@/features/service/utils/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface CategoryShowcaseProps {
  market: MarketCode;
  counts: Partial<Record<Category, number>>;
}

export const CategoryShowcase = ({ market, counts }: CategoryShowcaseProps) => {
  return (
    <section className="container px-4 py-16 md:py-20">
      <SectionHeading
        eyebrow="Categories"
        title="Everything a brand needs"
        description="Five creative territories, one checkout. Jump straight to what you came for."
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category];
          const count = counts[category] ?? 0;

          return (
            <Link
              key={category}
              href={`/${market}/service?category=${category}`}
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-4 font-heading text-base font-bold">{category}</span>
              <span className="mt-0.5 text-sm text-muted-foreground">
                {count} {count === 1 ? "service" : "services"}
              </span>
              <ArrowUpRight className="mt-4 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
