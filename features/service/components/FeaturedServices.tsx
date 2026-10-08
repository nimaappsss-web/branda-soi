import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service, MarketCode } from "@/types/brand";
import { ServiceGrid } from "./ServiceGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface FeaturedServicesProps {
  services: Service[];
  market: MarketCode;
}

export const FeaturedServices = ({ services, market }: FeaturedServicesProps) => {
  if (services.length === 0) return null;

  return (
    <section className="border-y border-border/60 bg-muted/30 py-16 md:py-20">
      <div className="container px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured"
            title="Popular right now"
            description="Hand-picked services our customers order the most."
          />
          <Link
            href={`/${market}/service`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ServiceGrid services={services} market={market} className="mt-10" />
      </div>
    </section>
  );
};
