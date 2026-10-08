"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2),
  );

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={createPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm">
            Previous
          </Button>
        </Link>
      )}
      {visiblePages[0] > 1 && (
        <>
          <Link href={createPageUrl(1)}>
            <Button variant="outline" size="sm">
              1
            </Button>
          </Link>
          {visiblePages[0] > 2 && <span>...</span>}
        </>
      )}
      {visiblePages.map((page) => (
        <Link key={page} href={createPageUrl(page)}>
          <Button
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={cn(page === currentPage && "pointer-events-none")}
          >
            {page}
          </Button>
        </Link>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span>...</span>}
          <Link href={createPageUrl(totalPages)}>
            <Button variant="outline" size="sm">
              {totalPages}
            </Button>
          </Link>
        </>
      )}
      {currentPage < totalPages && (
        <Link href={createPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </Link>
      )}
    </div>
  );
};
