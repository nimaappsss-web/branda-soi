export type MarketCode = 'ng' | 'us' | 'uk' | 'ca';

export type Currency = 'NGN' | 'USD' | 'GBP' | 'CAD';

export type Category = 'Digital' | 'Gifts' | 'Create' | 'Studio' | 'Prints';

export type UseCase = 'Business' | 'Personal' | 'Event' | 'Marketing';

export type Industry =
  | 'Fashion'
  | 'Food'
  | 'Tech'
  | 'Education'
  | 'Real Estate'
  | 'General';

export interface Variant {
  id: string;
  label: string;
  priceDelta?: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  images: string[];
  basePrice: number;
  discountPct?: number;
  whatIsIncluded: string[];
  turnaround: string;
  options?: Variant[];
  relatedServiceIds: string[];
  tags: string[];
  useCase: UseCase[];
  industry: Industry[];
  urgency?: 'Standard' | 'Rush';
  popularity: number;
}

export interface CartItem {
  serviceId: string;
  slug: string;
  name: string;
  image: string;
  variantId?: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  category: Category;
}

export interface MarketConfig {
  code: MarketCode;
  country: string;
  flag: string;
  currency: Currency;
  symbol: string;
  exchangeRate: number;
  heroTitle: string;
  heroSubtitle: string;
  featuredSlugs: string[];
}
