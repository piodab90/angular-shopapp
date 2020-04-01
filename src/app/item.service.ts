import { Injectable } from '@angular/core';
import { Item } from './Item';
import { Observable, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url: string = "/assets/mock-items.json";
  private items: Item[];
  private observableItems: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.items);

  constructor(private http: HttpClient) {
    this.http.request<Item[]>("GET", this.url, {responseType: "json"}).pipe(catchError(this.errorHandler)).subscribe(element => {
      this.items = element;
      this.itemsChanged();
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

  getItems(): Observable<Item[]> {
    return this.observableItems.asObservable();
  }

  getItemById(itemId: number): Observable<Item> {
    let item = this.items.find(item => item.id === itemId);
    let observableItem: BehaviorSubject<Item> = new BehaviorSubject<Item>(item);
    return observableItem.asObservable();
  }

  updateItemQuantity(item: Item, amount: number) {
    if (item.quantity + amount < 0) {
      return throwError("Not enough" + item.name + "items!");
    }
    item.quantity += amount;
    console.log(item);
    this.items.forEach(element => {
      console.log(element);
    });
    this.itemsChanged();
  }

  addItem(item: Item) {
    let maxId = 0;
    this.items.forEach(element => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    maxId++;
    item.id = maxId;
    this.items.push(item);
    this.itemsChanged();
  }

  removeItem(item: Item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
        this.items.splice(index, 1);
        this.itemsChanged();
    }  
  }

  itemsChanged() {
    this.observableItems.next(this.items);
  }
}
