import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  estudiantes: Estudiante[] = [];
  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionEstudiantes') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('registrosEstudiantes');
    if (datos !== null) {
      this.estudiantes = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }

  guardar() {
    if (this.cuenta.trim() === '' || this.nombre.trim() === '' || this.carrera.trim() === '' || this.fechaIngreso === '') {
      alert('Complete todos los campos obligatorios.');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const est of this.estudiantes) {
        if (est.id >= nuevoId) nuevoId = est.id + 1;
      }
      
      const nuevoEstudiante: Estudiante = {
        id: nuevoId,
        cuenta: this.cuenta.trim(),
        nombre: this.nombre.trim(),
        carrera: this.carrera.trim(),
        fechaIngreso: this.fechaIngreso
      };
      this.estudiantes.push(nuevoEstudiante);
    } else {
      this.estudiantes[this.indiceEditar].cuenta = this.cuenta.trim();
      this.estudiantes[this.indiceEditar].nombre = this.nombre.trim();
      this.estudiantes[this.indiceEditar].carrera = this.carrera.trim();
      this.estudiantes[this.indiceEditar].fechaIngreso = this.fechaIngreso;
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.cuenta = this.estudiantes[indice].cuenta;
    this.nombre = this.estudiantes[indice].nombre;
    this.carrera = this.estudiantes[indice].carrera;
    this.fechaIngreso = this.estudiantes[indice].fechaIngreso;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar este estudiante?')) {
      this.estudiantes.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
    this.indiceEditar = -1;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
  }
} 