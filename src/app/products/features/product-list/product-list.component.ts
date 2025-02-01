import { Component } from '@angular/core';
import { ProductService, Product } from '../../data-access/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export default class ProductListComponent {
  constructor(private productsService: ProductService) {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      console.log(products);
    });
  }
}
