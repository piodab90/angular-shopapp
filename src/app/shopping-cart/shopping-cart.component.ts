import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ItemService } from '../item.service';
import { CartItems } from '../cartItems';

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

  constructor(private cartService: CartService, private itemService: ItemService) { }

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
          cartItem.amount -= this.itemService.updateItemQuantity(cartItem.item, element.amount - cartItem.amount);
          element.amount = cartItem.amount;
        }
        this.cartService.setItemAmount(cartItem.item.id, cartItem.amount);
      }
    });
  }

  removeCartItems(cartItemToRemove: CartItems) {
    this.cartService.removeItemsFromCart(cartItemToRemove);
  }

  getTotalCost():number{
    this.totalCost = 0;
    this.itemsInCart.forEach(element => {
      this.totalCost += (element.item.price * element.amount)
    });
    return this.totalCost;
  }
}
