import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { faCoffee } from '@fortawesome/fontawesome-free';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-app';
  itemsInCart = 0;
  faCoffee = faCoffee;
  subscription: Subscription;

  constructor(private auth: AuthService, private cartService: CartService) {

  }

  ngOnInit() {
    this.cartService.getItemsInCart().subscribe(itemsInCart => this.itemsInCart = itemsInCart.length);
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}
