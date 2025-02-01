import { Product } from './../../shared/interfaces/products.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../shared/data-access/base-http-service';

const LIMIT = 5;

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  getProducts(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {
        limit: page * LIMIT,
      },
    });
  }
}
