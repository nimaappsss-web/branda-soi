"use client";

import { useState } from "react";
import { Service, MarketCode } from '@/types/brand';
import { ServiceGrid } from './ServiceGrid';
import { InfiniteScroll } from './InfiniteScroll';

interface MobileServiceListProps {
  initialServices: Service[];
  market: MarketCode;
  allServices: Service[];
}

export const MobileServiceList = ({
  initialServices,
  market,
  allServices,
}: MobileServiceListProps) => {
  const [services, setServices] = useState(initialServices);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 12;
  const totalPages = Math.ceil(allServices.length / limit);

  const loadMore = async () => {
    if (page >= totalPages) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const nextPage = page + 1;
    const start = (nextPage - 1) * limit;
    const next = allServices.slice(start, start + limit);
    setServices((prev) => [...prev, ...next]);
    setPage(nextPage);
    setIsLoading(false);
  };

  const hasMore = page < totalPages && services.length < allServices.length;

  return (
    <InfiniteScroll hasMore={hasMore} isLoading={isLoading} onLoadMore={loadMore}>
      <ServiceGrid services={services} market={market} />
    </InfiniteScroll>
  );
};
