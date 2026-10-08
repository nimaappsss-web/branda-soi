import { Category, UseCase, Industry } from '@/types/brand';
import { Camera, Gift, Monitor, PenTool, Printer, type LucideIcon } from 'lucide-react';

export const CATEGORIES: Category[] = ['Digital', 'Gifts', 'Create', 'Studio', 'Prints'];

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Digital: Monitor,
  Gifts: Gift,
  Create: PenTool,
  Studio: Camera,
  Prints: Printer,
};

export const USE_CASES: UseCase[] = ['Business', 'Personal', 'Event', 'Marketing'];

export const INDUSTRIES: Industry[] = [
  'Fashion',
  'Food',
  'Tech',
  'Education',
  'Real Estate',
  'General',
];

export const SORT_OPTIONS = [
  { value: 'popularity-desc', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
] as const;
