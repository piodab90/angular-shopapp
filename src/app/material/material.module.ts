import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialCOmponents = [
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatTableModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule
];

@NgModule({
  imports: [MaterialCOmponents],
  exports: [MaterialCOmponents]
})
export class MaterialModule { }
