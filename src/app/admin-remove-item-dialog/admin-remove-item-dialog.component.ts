import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-remove-item-dialog',
  templateUrl: './admin-remove-item-dialog.component.html',
  styleUrls: ['./admin-remove-item-dialog.component.css']
})
export class AdminRemoveItemDialogComponent {

  constructor(public dialogRef: MatDialogRef<AdminRemoveItemDialogComponent>) { }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
