import { Category, Industry, Service, UseCase } from '@/types/brand';

export interface ServiceFilters {
  q?: string;
  category?: Category;
  useCase?: UseCase;
  industry?: Industry;
  sort?: 'price-asc' | 'price-desc' | 'popularity-desc';
  page?: number;
  limit?: number;
}

export interface PaginatedServices {
  data: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
