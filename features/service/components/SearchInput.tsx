"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  defaultValue?: string;
}

export const SearchInput = ({ defaultValue }: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue || "");
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("q", debouncedValue);
      params.set("page", "1");
    } else {
      params.delete("q");
    }
    const nextQuery = params.toString();
    if (nextQuery === searchParams.toString()) return;
    router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ""}`, { scroll: false });
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search services..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 bg-card pl-9"
      />
    </div>
  );
};
