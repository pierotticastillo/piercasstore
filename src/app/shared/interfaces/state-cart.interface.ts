import { ProductItemCart } from "./product-item-cart";

export interface StateCart{
	products:	ProductItemCart[];
	loaded: boolean;
}