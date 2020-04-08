import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  authorizationFailed: boolean = false;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private auth: AuthService, private router: Router) {}

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;

    let result = this.auth.login(username, password);
    if (result === true) {
      this.dialogRef.close();
      this.router.navigate(['/admin']);
    } else {
      this.authorizationFailed = true;
    }
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}