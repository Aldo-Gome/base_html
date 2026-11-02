import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'producto', component: ProductoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];