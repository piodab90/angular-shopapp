import { Component } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractShoppingListComponent } from './abstract-shopping-list.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShoppingListComponent extends AbstractShoppingListComponent {

  amountOfItemsToAdd = '';
  oneItemMessage = $localize`:@@oneItem: item`;
  fewItemsMessage = $localize`:@@fewItems: items`;
  manyItemsMessage = $localize`:@@manyItems: items`;
  lackingItemsPrefixMessage = $localize`:@@lackingItemsPrefix:Only `;
  lackingItemsMessage = $localize`:@@lackingItems: have been added because there were not enough items in store.`;
  noItemsAddedMessage = $localize`:@@noItemsAdded:No items have been added to cart because there were not enough items in store.`;

  constructor(itemService: ItemService, private cartService: CartService, router: Router,
              route: ActivatedRoute, private snackBar: MatSnackBar) {
    super(itemService, router, route);
  }

  addItemsToCart(item: Item, amountOfItems: number) {
    let lackingItemsObservable = this.cartService.addItemToCart(item, amountOfItems);
    lackingItemsObservable.subscribe(lackingItems => {
      if (lackingItems > 0) {
        let message: string;
        if (lackingItems === amountOfItems) {
          message = this.noItemsAddedMessage;
        } else {
          let addedItems = amountOfItems - lackingItems;
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
    });
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
  }

}
