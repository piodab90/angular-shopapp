import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';
import { CartItems } from '../cartItems';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  itemsInCart: CartItems[];
  amountsOfItemsInCart = [];
  totalCost: number = 0;
  totalCostMessage = $localize`:@@totalCostMessage:Total cost: `;
  removedItemFromCartMessage = $localize`:@@removedItemFromCart:Item has been removed from cart.`;
  oneItemMessage = $localize`:@@oneItem: item`;
  fewItemsMessage = $localize`:@@fewItems: items`;
  manyItemsMessage = $localize`:@@manyItems: items`;
  lackingItemsPrefixMessage = $localize`:@@lackingItemsPrefix:Only `;
  lackingItemsMessage = $localize`:@@lackingItems: have been added because there were not enough items in store.`;
  noItemsAddedMessage = $localize`:@@noItemsAdded:No items have been added to cart because there were not enough items in store.`;

  constructor(private cartService: CartService, private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getItemsInCart().subscribe(itemsInCart => {
      this.itemsInCart = itemsInCart;
      this.amountsOfItemsInCart = [];
      this.itemsInCart.forEach(itemInCart => {
        this.amountsOfItemsInCart.push({id: itemInCart.item.id, amount: itemInCart.amount});
      });
    });
  }

  updateItemQuantity(cartItem: CartItems) {
    this.amountsOfItemsInCart.forEach(element => {
      if (element.id === cartItem.item.id) {
        if (cartItem.amount < 0) {
          cartItem.amount = 0;
          element.amount = 0;
        } else {
          let lackingItems = this.itemService.updateItemQuantity(cartItem.item, element.amount - cartItem.amount);
          if (lackingItems > 0) {
            let message: string;
            if (lackingItems === (cartItem.amount - element.amount)) {
              message = this.noItemsAddedMessage;
            } else {
              let addedItems = cartItem.amount - element.amount - lackingItems;
              message = this.lackingItemsPrefixMessage + addedItems;
              if (addedItems === 1) {
                message += this.oneItemMessage;
              } else if (addedItems > 1 && addedItems < 5) {
                message += this.fewItemsMessage;
              } else if (addedItems >= 5) {
                message += this.manyItemsMessage;
              }
              message += this.lackingItemsMessage;
            }
            this.snackBar.open(message);
          }
          cartItem.amount -= lackingItems;
          element.amount = cartItem.amount;
        }
        this.cartService.setItemAmount(cartItem.item.id, cartItem.amount);
      }
    });
  }

  removeCartItems(cartItemToRemove: CartItems) {
    this.cartService.removeItemsFromCart(cartItemToRemove);
    this.snackBar.open(this.removedItemFromCartMessage);
  }

  getTotalCost():number{
    this.totalCost = 0;
    this.itemsInCart.forEach(element => {
      this.totalCost += (element.item.price * element.amount)
    });
    return this.totalCost;
  }
}
