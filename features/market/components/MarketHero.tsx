import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { MarketConfig } from "@/types/brand";
import { marketsConfig } from "@/features/market/config/markets";
import { Button } from "@/components/ui/button";

interface MarketHeroProps {
  config: MarketConfig;
  serviceCount: number;
  categoryCount: number;
}

export const MarketHero = ({ config, serviceCount, categoryCount }: MarketHeroProps) => {
  const marketCount = Object.keys(marketsConfig).length;
  const stats = [
    { value: `${serviceCount}+`, label: "Services" },
    { value: `${categoryCount}`, label: "Categories" },
    { value: `${marketCount}`, label: "Markets" },
    { value: "2–3 days", label: "Fast turnaround" },
  ];

  return (
    <section className="border-b border-border/60">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-sm font-medium">
            <span aria-hidden>{config.flag}</span>
            {config.country} market · {config.currency}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {config.heroTitle}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {config.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${config.code}/service`}>
              <Button size="lg" className="h-11 px-6 text-base">
                Browse Services
                <ArrowRight />
              </Button>
            </Link>
            <Link href={`/${config.code}/service?sort=popularity-desc`}>
              <Button size="lg" variant="outline" className="h-11 px-6 text-base">
                <Zap />
                Most popular
              </Button>
            </Link>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-card p-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
