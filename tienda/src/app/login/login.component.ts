import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' // Copia aquí el mismo CSS de la guía 1
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'vendedor' && this.clave === 'tienda123') {
      localStorage.setItem('sesionTienda', 'si');
      this.router.navigate(['/producto']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}