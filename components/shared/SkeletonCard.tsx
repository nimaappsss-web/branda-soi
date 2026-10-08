import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard = ({ className }: SkeletonCardProps) => {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-8 w-full" />
    </div>
  );
};
