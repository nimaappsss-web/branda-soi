"use client";

import { SearchInput } from './SearchInput';
import { Filters } from './Filters';
import { SortSelect } from './SortSelect';
import { Category, UseCase, Industry } from '@/types/brand';

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
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchInput defaultValue={search} />
        <SortSelect defaultValue={sort || 'popularity-desc'} />
      </div>
      <Filters
        defaultCategory={category}
        defaultUseCase={useCase}
        defaultIndustry={industry}
      />
    </div>
  );
};
