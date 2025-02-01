import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/products-state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export default class ProductListComponent {
  productsState = inject(ProductStateService);
}
