import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

  get isLoggedIn() {
    return this.loggedIn;
  }

  login(username, password) {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true
    }
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
}
