import { cn } from "cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};
