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
  item: Item;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let itemId = parseInt(params.get('id'));
      if (!itemId) {
        this.item = new Item();
      } else {
        this.itemService.getItemById(itemId).subscribe(element => this.item = element);
      }
    });
  }

  addItem() {
    this.itemService.addItem(this.item);
    this.router.navigate(['/admin']);
    this.snackBar.open(this.itemAddedMessage);
  }

  isEditMode(): boolean {
    if (!this.item.id) {
      return false;
    }
    return true;
  }
}
