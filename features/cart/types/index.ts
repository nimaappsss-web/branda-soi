import { CartItem } from '@/types/brand';

export interface CartStore {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (serviceId: string, variantId: string) => void;
  updateQty: (serviceId: string, variantId: string, qty: number) => void;
  clear: () => void;
  getItemCount: () => number;
  getItems: () => CartItem[];
}
