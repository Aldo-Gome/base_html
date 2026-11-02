import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {
  tareas: Tarea[] = [];
  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente'; // Valor inicial propuesto
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionTareas') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('agendaTareas');
    if (datos !== null) {
      this.tareas = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }

  guardar() {
    if (this.titulo.trim() === '' || this.descripcion.trim() === '' || this.fechaLimite === '' || this.estado === '') {
      alert('Complete todos los campos obligatorios.');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const t of this.tareas) {
        if (t.id >= nuevoId) nuevoId = t.id + 1;
      }
      
      const nuevaTarea: Tarea = {
        id: nuevoId,
        titulo: this.titulo.trim(),
        descripcion: this.descripcion.trim(),
        fechaLimite: this.fechaLimite,
        estado: this.estado
      };
      this.tareas.push(nuevaTarea);
    } else {
      this.tareas[this.indiceEditar].titulo = this.titulo.trim();
      this.tareas[this.indiceEditar].descripcion = this.descripcion.trim();
      this.tareas[this.indiceEditar].fechaLimite = this.fechaLimite;
      this.tareas[this.indiceEditar].estado = this.estado;
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.titulo = this.tareas[indice].titulo;
    this.descripcion = this.tareas[indice].descripcion;
    this.fechaLimite = this.tareas[indice].fechaLimite;
    this.estado = this.tareas[indice].estado;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareas.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente'; // Restablece al propuesto
    this.indiceEditar = -1;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  }
}