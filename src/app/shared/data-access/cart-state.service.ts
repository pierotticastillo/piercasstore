import { inject, Injectable, Signal } from '@angular/core';
import { StateCart } from '../interfaces/state-cart.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductItemCart } from '../interfaces/product-item-cart';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private _storageService = inject(StorageService);
  private initialState: StateCart = {
    products: [],
    loaded: false,
  };

  loadProducts$ = this._storageService.loadProducts().pipe(
    map((products) => ({
      products,
      loaded: true,
    })),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      add: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(map((product) => this.add(state, product))),
    },
    effects: (state) => ({
      load: () => {
				if (state().loaded) {
					this._storageService.saveProducts(state().products)
				}
        console.log(state.products());
      },
    }),
  });

  private add(state: Signal<StateCart>, product: ProductItemCart) {
    const isInCart = state().products.find(
      (productInCart) => productInCart.product.id === product.product.id,
    );
    if (!isInCart) {
      return 	{ products:[...state().products, { ...product, quantity: 1 }]};
    }
    isInCart.quantity += 1;
    return {
      products: [...state().products],
    };
  }
}
