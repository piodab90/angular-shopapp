import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AbstractShoppingListComponent } from '../shopping-list/abstract-shopping-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminComponent extends AbstractShoppingListComponent {

  constructor(private auth: AuthService, itemService: ItemService, router: Router, route: ActivatedRoute) {
    super(itemService, router, route);
  }

  removeItem(item: Item) {
    this.itemService.removeItem(item);
  }
}
