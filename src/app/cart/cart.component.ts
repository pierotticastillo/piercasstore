import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product-item-cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemove = (id: number) => {
    this.state.remove(id);
  };
  onIncrease = (product: ProductItemCart) => {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });
  };

  onDecrease = (product: ProductItemCart) => {
    if (product.quantity > 1) {
      this.state.update({
        product: product.product,
        quantity: product.quantity - 1,
      });
    } else{
      this.state.remove(product.product.id);
    }
  };
}
