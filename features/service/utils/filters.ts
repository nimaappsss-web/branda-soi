import { Service } from '@/types/brand';
import { ServiceFilters, PaginatedServices } from '@/features/service/types';

export const filterAndSortServices = (
  services: Service[],
  filters: ServiceFilters,
): Service[] => {
  let result = [...services];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (filters.category) {
    result = result.filter((s) => s.category === filters.category);
  }

  if (filters.useCase) {
    result = result.filter((s) => s.useCase.includes(filters.useCase!));
  }

  if (filters.industry) {
    result = result.filter((s) => s.industry.includes(filters.industry!));
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'popularity-desc':
    default:
      result.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return result;
};

export const paginateServices = (
  services: Service[],
  filters: ServiceFilters,
): PaginatedServices => {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = services.slice(start, end);

  return {
    data: paginated,
    total: services.length,
    page,
    limit,
    totalPages: Math.ceil(services.length / limit),
    hasMore: end < services.length,
  };
};
