import { inject, Injectable } from '@angular/core';
import { State } from '../../shared/interfaces/state.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './products.service';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private productsService = inject(ProductService);
  private initialState: State = {
    products: [],
    status: 'loading',
    page: 1,
  };

  changePage$ = new Subject<number>();

  loadProducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.productsService.getProducts(page)),
    map((products) => ({
      products,
      status: 'success' as const, // Asegura que el tipo sea 'success'
    })),
    catchError(() => {
      return of({ products: [], status: 'error' as const });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProducts$,
    ],
  });
}
