import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libros: Libro[] = [];
  
  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;
  
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionBiblioteca') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('librosBiblioteca');
    if (datos !== null) {
      this.libros = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }

  guardar() {
    if (this.codigo.trim() === '' || this.titulo.trim() === '' || this.autor.trim() === '' || this.anio === null) {
      alert('Complete todos los campos obligatorios.');
      return;
    }
    
    // Validación del año (entero de 4 cifras)
    if (this.anio < 1000 || this.anio > 9999 || !Number.isInteger(this.anio)) {
      alert('El año debe ser un número entero de 4 cifras (ej: 2024).');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const libro of this.libros) {
        if (libro.id >= nuevoId) nuevoId = libro.id + 1;
      }
      
      const nuevoLibro: Libro = {
        id: nuevoId,
        codigo: this.codigo.trim(),
        titulo: this.titulo.trim(),
        autor: this.autor.trim(),
        anio: this.anio
      };
      this.libros.push(nuevoLibro);
    } else {
      this.libros[this.indiceEditar].codigo = this.codigo.trim();
      this.libros[this.indiceEditar].titulo = this.titulo.trim();
      this.libros[this.indiceEditar].autor = this.autor.trim();
      this.libros[this.indiceEditar].anio = this.anio;
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.codigo = this.libros[indice].codigo;
    this.titulo = this.libros[indice].titulo;
    this.autor = this.libros[indice].autor;
    this.anio = this.libros[indice].anio;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar este libro?')) {
      this.libros.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
    this.indiceEditar = -1;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
  }
}