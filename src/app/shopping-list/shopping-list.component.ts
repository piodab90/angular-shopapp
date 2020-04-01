import { Component } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractShoppingListComponent } from './abstract-shopping-list.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  constructor(itemService: ItemService, private cartService: CartService, router: Router, route: ActivatedRoute) {
    super(itemService, router, route);
  }

  addItemsToCart(item: Item, amountOfItems: number) {
    this.cartService.addItemToCart(item, amountOfItems);
  }

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
  }

}
