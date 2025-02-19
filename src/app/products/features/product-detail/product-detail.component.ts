import { CommonModule, CurrencyPipe } from '@angular/common'; // Importar CommonModule
import { ProductDetailStateService } from './../../data-access/product-detail-state.service';
import { Component, effect, inject, input, output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../../shared/interfaces/products.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Agregar CommonModule aquí
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductDetailStateService);
  id = input.required<string>();

  // Observable que emite los datos del producto
  product$: Observable<Product | null> = this.productDetailState.state$.pipe(
    map((state) => state.product),
  );

  constructor() {
    effect(() => {
      const productId = this.id();
      this.productDetailState.getById(productId);
    });
  }

  get status() {
    return this.productDetailState.state.status;
  }
  product = input.required<Product>();
    addToCart = output<Product>();
    add(event: Event) {
      event.stopPropagation();
      event.preventDefault();
      this.addToCart.emit(this.product());
    }
}
