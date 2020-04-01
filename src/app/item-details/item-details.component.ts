import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../Item';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  public itemId;

  @Input() item: Item;
  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    // this.itemId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.itemId = parseInt(params.get('id'));
      // this.itemService.getItems().subscribe(data => this.items = data);
    });
  }

  goBack() {
    let selectedId = this.itemId ? this.itemId : null;
    this.router.navigate(['/shop', {id: selectedId}]);
  }
}
