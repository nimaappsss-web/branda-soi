import { mockServices } from '@/data/mock-services';
import { filterAndSortServices, paginateServices } from '@/features/service/utils/filters';
import { ServiceFilters, PaginatedServices } from '@/features/service/types';
import { Service } from '@/types/brand';

export const getServices = (filters: ServiceFilters): PaginatedServices => {
  const filtered = filterAndSortServices(mockServices, filters);
  return paginateServices(filtered, filters);
};

export const getAllServicesForListing = (filters: ServiceFilters): Service[] => {
  return filterAndSortServices(mockServices, filters);
};

export const getServiceBySlug = (slug: string): Service | undefined => {
  return mockServices.find((s) => s.slug === slug);
};

export const getRelatedServices = (service: Service): Service[] => {
  const related = mockServices.filter(
    (s) => service.relatedServiceIds.includes(s.id) && s.id !== service.id,
  );
  if (related.length > 0) return related;
  return mockServices.filter(
    (s) => s.category === service.category && s.id !== service.id,
  ).slice(0, 4);
};
