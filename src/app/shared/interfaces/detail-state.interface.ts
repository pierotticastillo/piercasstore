import { Product } from './products.interface';

export interface DetailState {
  product: Product | null;
  status: 'loading' | 'success' | 'error';
}
