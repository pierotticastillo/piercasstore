import { Product } from './products.interface';

export interface ProductItemCart {
  /* Producto seleccionado*/
  product: Product;
  /* Cuantos productos del mismo tipo existen en el carrito de compras */
  quantity: number;
}
