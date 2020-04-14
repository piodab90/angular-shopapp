import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AbstractShoppingListComponent } from '../shopping-list/abstract-shopping-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminRemoveItemDialogComponent } from '../admin-remove-item-dialog/admin-remove-item-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../Item';

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

  itemRemovedMessage = $localize`:@@itemRemoved:Item has been removed.`;

  constructor(itemService: ItemService, router: Router, route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) {
    super(itemService, router, route);
  }

  removeItem(item: Item) {
    const dialogRef = this.dialog.open(AdminRemoveItemDialogComponent, {
      width: '435px'
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result === true) {
        this.itemService.removeItem(item).subscribe(element => {
          this.itemService.removeItemFromList(item);
          this.snackBar.open(this.itemRemovedMessage);
        });
      }
    });
  }
}
