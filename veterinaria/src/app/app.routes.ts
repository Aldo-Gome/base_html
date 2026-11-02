import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MascotaComponent } from './mascota/mascota.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'mascota', component: MascotaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];