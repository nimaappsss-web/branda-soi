"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { Filters } from "./Filters";
import { SortSelect } from "./SortSelect";
import { BottomDrawer } from "@/components/others/BottomDrawer";
import { Button } from "@/components/ui/button";
import { Category, UseCase, Industry } from "@/types/brand";

interface ServiceListHeaderProps {
  search?: string;
  category?: Category;
  useCase?: UseCase;
  industry?: Industry;
  sort?: string;
}

export const ServiceListHeader = ({
  search,
  category,
  useCase,
  industry,
  sort,
}: ServiceListHeaderProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCount = [category, useCase, industry].filter(Boolean).length;

  return (
    <>
      <div className="sticky top-[69px] z-30 rounded-2xl border border-border/60 bg-card p-4 md:top-[74px] md:p-5">
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-3">
            <SearchInput defaultValue={search} />
            <SortSelect defaultValue={sort || "popularity-desc"} />
          </div>
          <div className="mt-4 border-t border-border/60 pt-4">
            <Filters
              defaultCategory={category}
              defaultUseCase={useCase}
              defaultIndustry={industry}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="min-w-0 flex-1">
            <SearchInput defaultValue={search} />
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            aria-label={
              activeCount > 0
                ? `Filters (${activeCount} active)`
                : "Open filters"
            }
            className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-foreground transition-colors hover:bg-secondary"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <BottomDrawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        title="Filters"
        footer={
          <Button
            className="h-11 w-full text-base"
            onClick={() => setFiltersOpen(false)}
          >
            Show results
          </Button>
        }
      >
        <div className="flex flex-col gap-5 [&_[data-slot=select-trigger]]:w-full">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <SortSelect defaultValue={sort || "popularity-desc"} />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">Filter by</span>
            <Filters
              defaultCategory={category}
              defaultUseCase={useCase}
              defaultIndustry={industry}
            />
          </div>
        </div>
      </BottomDrawer>
    </>
  );
};
