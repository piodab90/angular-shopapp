import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  template: ''
})
export class AbstractShoppingListComponent implements OnInit {

  items: Item[];
  errorMsg: string;
  displayedColumnsLabels: string[] = [$localize`:@@name:Name`, $localize`:@@price:Price`, $localize`:@@quantity:Quantity`];
  displayedColumns: string[] = ['name', 'price', 'quantity'];
  dataSource: MatTableDataSource<Item>;
  expandedElement: Item | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(protected itemService: ItemService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe((data) => {
                                            this.items = data; 
                                            this.dataSource = new MatTableDataSource(this.items);
                                            this.dataSource.paginator = this.paginator;
                                            this.dataSource.sort = this.sort;
                                          },  
                                          error => this.errorMsg = error);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
