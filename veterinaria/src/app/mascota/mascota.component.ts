import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
  mascotas: Mascota[] = [];
  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('mascotasVeterinaria');
    if (datos !== null) {
      this.mascotas = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }

  guardar() {
    if (this.nombre.trim() === '' || this.especie.trim() === '' || this.edad === null || this.propietario.trim() === '') {
      alert('Complete todos los campos obligatorios.');
      return;
    }

    if (this.edad < 0 || !Number.isInteger(this.edad)) {
      alert('La edad debe ser un número entero mayor o igual a cero.');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const m of this.mascotas) {
        if (m.id >= nuevoId) nuevoId = m.id + 1;
      }
      
      const nuevaMascota: Mascota = {
        id: nuevoId,
        nombre: this.nombre.trim(),
        especie: this.especie.trim(),
        edad: this.edad,
        propietario: this.propietario.trim()
      };
      this.mascotas.push(nuevaMascota);
    } else {
      this.mascotas[this.indiceEditar].nombre = this.nombre.trim();
      this.mascotas[this.indiceEditar].especie = this.especie.trim();
      this.mascotas[this.indiceEditar].edad = this.edad;
      this.mascotas[this.indiceEditar].propietario = this.propietario.trim();
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.nombre = this.mascotas[indice].nombre;
    this.especie = this.mascotas[indice].especie;
    this.edad = this.mascotas[indice].edad;
    this.propietario = this.mascotas[indice].propietario;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar esta mascota?')) {
      this.mascotas.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.indiceEditar = -1;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
  }
}