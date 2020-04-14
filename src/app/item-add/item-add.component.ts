import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../Item';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ItemService } from '../item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  itemAddedMessage = $localize`:@@itemAdded:Item has been added.`;
  itemUpdatedMessage = $localize`:@@itemUpdated:Item has been updated.`;
  item: Item;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.item = new Item();
      let itemId = parseInt(params.get('id'));
      if (itemId) {
        this.itemService.getItemById(itemId).subscribe(element => {
          this.item.id = element.id;
          this.item.name = element.name;
          this.item.description = element.description;
          this.item.price = element.price;
          this.item.quantity = element.quantity;
        });
      }
    });
  }

  addItem() {
    this.itemService.addItem(this.item).subscribe(element => {
      this.itemService.addItemToList(element);
      this.router.navigate(['/admin']);
      this.snackBar.open(this.itemAddedMessage);
    });
  }

  updateItem() {
    this.itemService.updateItem(this.item).subscribe(element => {
      this.itemService.updateItemInList(element);
      this.router.navigate(['/admin']);
      this.snackBar.open(this.itemUpdatedMessage);
    });
  }

  isEditMode(): boolean {
    if (!this.item.id) {
      return false;
    }
    return true;
  }
}
