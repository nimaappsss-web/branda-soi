import { mockServices } from './mock-services';
import { Service } from '@/types/brand';

export const getAllServices = (): Service[] => {
  return mockServices;
};

export const getServiceBySlug = (slug: string): Service | undefined => {
  return mockServices.find((s) => s.slug === slug);
};

export const getServicesByIds = (ids: string[]): Service[] => {
  return mockServices.filter((s) => ids.includes(s.id));
};
