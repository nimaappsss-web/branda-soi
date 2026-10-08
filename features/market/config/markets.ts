import { MarketCode, MarketConfig } from '@/types/brand';

export const marketsConfig: Record<MarketCode, MarketConfig> = {
  ng: {
    code: 'ng',
    country: 'Nigeria',
    currency: 'NGN',
    symbol: '₦',
    exchangeRate: 1.0,
    heroTitle: 'Branding Services for Nigerian Businesses',
    heroSubtitle: 'Digital, Gifts, Create, Studio & Prints - tailored for Nigeria',
    featuredSlugs: ['logo-design', 'business-cards', 'branded-mugs'],
  },
  us: {
    code: 'us',
    country: 'United States',
    currency: 'USD',
    symbol: '$',
    exchangeRate: 0.00065, // approx NGN to USD (mock)
    heroTitle: 'Branding Services for US Businesses',
    heroSubtitle: 'Professional branding solutions for the American market',
    featuredSlugs: ['logo-design', 'website-banner', 'business-cards'],
  },
  uk: {
    code: 'uk',
    country: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    exchangeRate: 0.0005, // approx NGN to GBP (mock)
    heroTitle: 'Branding Services for UK Businesses',
    heroSubtitle: 'Quality branding services across the UK',
    featuredSlugs: ['logo-design', 'brand-identity-kit', 'business-cards'],
  },
  ca: {
    code: 'ca',
    country: 'Canada',
    currency: 'CAD',
    symbol: 'C$',
    exchangeRate: 0.00088, // approx NGN to CAD (mock)
    heroTitle: 'Branding Services for Canadian Businesses',
    heroSubtitle: 'Creative branding for Canadian businesses',
    featuredSlugs: ['logo-design', 'brochures', 'business-cards'],
  },
};

export const getMarketConfig = (code: MarketCode): MarketConfig => {
  return marketsConfig[code];
};
