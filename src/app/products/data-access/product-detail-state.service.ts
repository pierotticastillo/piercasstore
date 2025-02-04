import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, of, tap } from 'rxjs';
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
    // Emitimos el estado de "loading" antes de llamar al servicio
    this._state.next({ product: null, status: 'loading' });

    this.productsService
      .getProductById(id)
      .pipe(
        tap(() => console.log('🔵 Calling getProductById with:', id)),
        map((data) => ({ product: data, status: 'success' as const })),
        catchError((error) => {
          return of({ product: null, status: 'error' as const });
        }),
      )
      .subscribe((newState) => {
        this._state.next(newState);
      });
  }

  get state() {
    return this._state.getValue();
  }
}
