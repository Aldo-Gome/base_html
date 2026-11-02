import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TareaComponent } from './tarea/tarea.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tarea', component: TareaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];