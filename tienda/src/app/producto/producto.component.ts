import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css' // Copia aquí el mismo CSS de la tabla
})
export class ProductoComponent {
  productos: Producto[] = [];
  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionTienda') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('productosTienda');
    if (datos !== null) {
      this.productos = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }

  guardar() {
    if (this.codigo.trim() === '' || this.nombre.trim() === '' || this.precio === null || this.existencias === null) {
      alert('Complete todos los campos obligatorios.');
      return;
    }
    
    if (this.precio <= 0) {
      alert('El precio debe ser mayor a cero.');
      return;
    }

    if (this.existencias < 0 || !Number.isInteger(this.existencias)) {
      alert('Las existencias deben ser un número entero mayor o igual a cero.');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const prod of this.productos) {
        if (prod.id >= nuevoId) nuevoId = prod.id + 1;
      }
      
      const nuevoProducto: Producto = {
        id: nuevoId,
        codigo: this.codigo.trim(),
        nombre: this.nombre.trim(),
        precio: this.precio,
        existencias: this.existencias
      };
      this.productos.push(nuevoProducto);
    } else {
      this.productos[this.indiceEditar].codigo = this.codigo.trim();
      this.productos[this.indiceEditar].nombre = this.nombre.trim();
      this.productos[this.indiceEditar].precio = this.precio;
      this.productos[this.indiceEditar].existencias = this.existencias;
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.codigo = this.productos[indice].codigo;
    this.nombre = this.productos[indice].nombre;
    this.precio = this.productos[indice].precio;
    this.existencias = this.productos[indice].existencias;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.productos.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.indiceEditar = -1;
  }

  guardarEnLocalStorage() {
    localStorage.setItem('productosTienda', JSON.stringify(this.productos));
  }
}