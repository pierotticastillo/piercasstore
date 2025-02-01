import { inject, Injectable } from '@angular/core';
import { State } from '../../shared/interfaces/state.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from './products.service';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private productsService = inject(ProductService);

  private initialState: State = {
    products: [],
    status: 'loading',
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.productsService.getProducts().pipe(
        map((products) => ({
          products,
          status: 'success' as const, // Asegura que el tipo sea 'success'
        })),
      ),
    ],
  });
}
