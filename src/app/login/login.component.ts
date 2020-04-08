import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout() {
    let result = this.auth.logout();
    this.router.navigate(['/']);
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '290px'
    });
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}