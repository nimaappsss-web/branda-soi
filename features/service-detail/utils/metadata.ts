import { Metadata } from 'next';
import { getServiceBySlug } from '@/features/service/api/services.service';

export const generateServiceMetadata = async (slug: string, market: string): Promise<Metadata> => {
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.name} | Branda V2 (${market.toUpperCase()})`,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      images: [service.images[0]],
    },
  };
};
