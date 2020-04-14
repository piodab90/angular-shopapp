import { Injectable } from '@angular/core';
import { CartItems } from './cartItems';
import { Item } from './item';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsInCart: CartItems[] = new Array<CartItems>();
  observableItemsInCart: BehaviorSubject<CartItems[]> = new BehaviorSubject<CartItems[]>(this.itemsInCart);

  constructor(private itemService: ItemService) {

  }

  getItemsInCart(): Observable<CartItems[]> {
    return this.observableItemsInCart.asObservable();
  }

  addItemToCart(item: Item, amountOfItems: number): Observable<number> {
    let lackingItems;
    let observableLackingItems: BehaviorSubject<number> = new BehaviorSubject<number>(lackingItems);
    this.itemService.updateItemQuantity(item, -amountOfItems).subscribe(element => {
      this.itemService.updateItemInList(element.item);
      lackingItems = element.amount;
      let isItemAlreadyInCart: boolean = false;
      this.itemsInCart.forEach(itemInCart => {
        if (itemInCart.item.id === item.id) {
          itemInCart.amount += amountOfItems - lackingItems;
          isItemAlreadyInCart = true;
        }
      });
      if (isItemAlreadyInCart === false) {
        let cartItem = new CartItems(item, amountOfItems - lackingItems);
        this.itemsInCart.push(cartItem);
      }
      observableLackingItems.next(lackingItems)
      this.cartChanged();
    });
    return observableLackingItems.asObservable();
  }

  removeItemsFromCart(cartItem: CartItems) {
    let index = this.itemsInCart.indexOf(cartItem);
    if (index > -1) {
      this.itemsInCart.splice(index, 1);
      this.itemService.updateItemQuantity(cartItem.item, cartItem.amount).subscribe(element => {
        this.itemService.updateItemInList(element.item);
        this.cartChanged();
      });
    }
  }

  setItemAmount(itemId: number, amount: number) {
    this.itemsInCart.forEach(itemInCart => {
      if (itemInCart.item.id === itemId) {
        itemInCart.amount = amount;
      }
    });
    this.cartChanged();
  }

  cartChanged() {
    this.observableItemsInCart.next(this.itemsInCart);
  }
}
