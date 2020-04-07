import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ {path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShoppingListComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/:id', component: ItemAddComponent, canActivate: [AuthGuard] },
  { path: 'admin/add', component: ItemAddComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ShoppingListComponent, ItemAddComponent, ShoppingCartComponent, PageNotFoundComponent, LoginComponent, AdminComponent]