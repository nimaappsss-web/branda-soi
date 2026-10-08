"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, USE_CASES, INDUSTRIES } from "@/features/service/utils/constants";
import { Category, UseCase, Industry } from "@/types/brand";

interface FiltersProps {
  defaultCategory?: Category;
  defaultUseCase?: UseCase;
  defaultIndustry?: Industry;
}

export const Filters = ({
  defaultCategory,
  defaultUseCase,
  defaultIndustry,
}: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value?: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      params.set("page", "1");
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={defaultCategory || "all"}
        onValueChange={(v) => updateParams("category", v === "all" ? undefined : v)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={defaultUseCase || "all"}
        onValueChange={(v) => updateParams("useCase", v === "all" ? undefined : v)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Use Case" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Use Cases</SelectItem>
          {USE_CASES.map((u) => (
            <SelectItem key={u} value={u}>
              {u}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={defaultIndustry || "all"}
        onValueChange={(v) => updateParams("industry", v === "all" ? undefined : v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Industries</SelectItem>
          {INDUSTRIES.map((i) => (
            <SelectItem key={i} value={i}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(defaultCategory || defaultUseCase || defaultIndustry) && (
        <Button variant="outline" size="sm" onClick={clearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};
