import { Injectable } from '@angular/core';
import { Item } from './Item';
import { Observable, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartItems } from './cartItems';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // private url: string = "/assets/mock-items.json";
  private url: string = "/items/all";
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

  addItemToList(item: Item) {
    this.items.push(item);
    this.itemsChanged();
  }

  updateItemInList(item: Item) {
    const index: number = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.itemsChanged();
    }
  }

  removeItemFromList(item: Item) {
    const index: number = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.itemsChanged();
    }
  }

  getItems(): Observable<Item[]> {
    return this.observableItems.asObservable();
  }

  getItemById(itemId: number): Observable<Item> {
    let item = this.items.find(item => item.id === itemId);
    let observableItem: BehaviorSubject<Item> = new BehaviorSubject<Item>(item);
    return observableItem.asObservable();
  }

  //returned Item is updated version of item object
  //returned amount is amount of lacking items
  updateItemQuantity(item: Item, amount: number): Observable<CartItems> {
    return this.http.put<CartItems>('/items/updateItemQuantity/' + item.id + '/' + amount, null).pipe(catchError(this.errorHandler));
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>('/items/add',item).pipe(catchError(this.errorHandler));
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>('/items/update',item).pipe(catchError(this.errorHandler));
  }

  removeItem(item: Item): Observable<Item> {
    return this.http.delete<Item>('/items/delete/' + item.id).pipe(catchError(this.errorHandler));
  }

  itemsChanged() {
    this.observableItems.next(this.items);
  }
}
