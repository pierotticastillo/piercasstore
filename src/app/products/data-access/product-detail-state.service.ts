import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, of } from 'rxjs';
import { ProductService } from './products.service';
import { DetailState } from '../../shared/interfaces/detail-state.interface';

@Injectable({ providedIn: 'root' })
export class ProductDetailStateService {
  private productsService = inject(ProductService);

  // Estado inicial
  private _state = new BehaviorSubject<DetailState>({
    product: null,
    status: 'loading',
  });
  state$ = this._state.asObservable();

  constructor() {}

  getById(id: string) {
    this.productsService
      .getProductById(id)
      .pipe(
        map((data) => ({ product: data, status: 'success' as const })),
        catchError((error) => {
          return of({ product: null, status: 'error' as const });
        }),
      )
      .subscribe((newState) => {
        this._state.next(newState);
      });
  }
}
