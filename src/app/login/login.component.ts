import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;

    let result = this.auth.login(username, password);
    if (result === true) {
      this.router.navigate(['/admin']);
    } else {
      window.alert("Invalid credentials!");
    }
  }

  logout() {
    let result = this.auth.logout();
    this.router.navigate(['/']);
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}
