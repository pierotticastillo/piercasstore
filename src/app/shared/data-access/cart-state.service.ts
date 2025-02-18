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
    catchError((error) => {
      console.error('Error loading products:', error);
      return of(this.initialState);
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      add: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(map((product) => this.add(state, product))),

      remove: (state, action$: Observable<number>) =>
        action$.pipe(map((id) => this.remove(state, id))),

      update: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(map((product) => this.update(state, product))),
    },
    effects: (state) => ({
      load: () => {
        if (state().loaded) {
          this._storageService.saveProducts(state().products);
        }
        console.log(state().products); // Corregido
      },
    }),
  });

  private add(state: Signal<StateCart>, product: ProductItemCart) {
    const existingProduct = state().products.find(
      (productInCart) => productInCart.product.id === product.product.id,
    );
    if (!existingProduct) {
      return {
        products: [...state().products, { ...product, quantity: 1 }],
      };
    }
    return {
      products: state().products.map((p) =>
        p.product.id === product.product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p,
      ),
    };
  }

  private remove(state: Signal<StateCart>, id: number) {
    return {
      products: state().products.filter((product) => product.product.id !== id),
    };
  }
  private update(state: Signal<StateCart>, product: ProductItemCart) {
    const products = state().products.map((productInCart) => {
      if (productInCart.product.id === product.product.id) {
        return { ...productInCart, quantity: product.quantity };
      }
      return productInCart;
    });
    return {
      products,
    };
  }
}
