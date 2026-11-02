import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'registro' && this.clave === 'alumnos123') {
      localStorage.setItem('sesionEstudiantes', 'si');
      this.router.navigate(['/estudiante']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}