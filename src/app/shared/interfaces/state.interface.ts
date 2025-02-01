import { Product } from './products.interface';

export interface State {
  products: Product[];
  status: 'loading' | 'success' | 'error';
  page: number;
}
