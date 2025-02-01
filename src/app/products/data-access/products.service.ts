import { Product } from './../../shared/interfaces/products.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../shared/data-access/base-http-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}
