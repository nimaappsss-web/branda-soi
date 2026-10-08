import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return (
    <p className={cn("mt-2 text-sm text-destructive", className)}>{children}</p>
  );
};
