import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'estudiante', component: EstudianteComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];