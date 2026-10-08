import { PackageCheck, Search, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STEPS = [
  {
    icon: Search,
    title: "Browse",
    description: "Explore services across digital, gifts, create, studio and print.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customize",
    description: "Pick options, quantities and turnaround that fit your deadline.",
  },
  {
    icon: PackageCheck,
    title: "Receive",
    description: "We deliver polished brand assets, ready to put to work.",
  },
] as const;

export const HowItWorks = () => {
  return (
    <section className="container px-4 py-16 md:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="From brief to brand in three steps"
        align="center"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border/60 bg-card p-6"
            >
              <span className="absolute right-5 top-5 font-heading text-4xl font-bold text-primary/15">
                {index + 1}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
