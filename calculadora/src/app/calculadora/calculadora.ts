import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-calculadora',
  styleUrl: './calculadora.css',
  templateUrl: './calculadora.html',
})
export class Calculadora {
  pantalla: string = '0';
  primerOperando: number | null = null;
  operador: string | null = null;
  esperandoSegundoNumero: boolean = false;

  agregarNumero(numero: string) {
    if (this.esperandoSegundoNumero) {
      this.pantalla = numero;
      this.esperandoSegundoNumero = false;
    } else {
      this.pantalla === '0' ? (this.pantalla = numero) : (this.pantalla += numero);
    }
  }

  agregarDecimal() {
    if (!this.pantalla.includes('.')) {
      this.pantalla += '.';
    }
  }

  seleccionarOperacion(op: string) {
    if (this.primerOperando === null) {
      this.primerOperando = Number(this.pantalla);
    } else if (this.operador) {
      const resultado = this.calcular(this.operador, Number(this.pantalla));
      this.pantalla = String(resultado);
      this.primerOperando = resultado;
    }
    
    this.operador = op;
    this.esperandoSegundoNumero = true;
  }

  limpiar() {
    this.pantalla = '0';
    this.primerOperando = null;
    this.operador = null;
    this.esperandoSegundoNumero = false;
  }

  private calcular(op: string, segundoOperando: number): number {
    switch (op) {
      case '+': return this.primerOperando! + segundoOperando;
      case '-': return this.primerOperando! - segundoOperando;
      case '*': return this.primerOperando! * segundoOperando;
      case '/': return this.primerOperando! / segundoOperando;
      case '=': return segundoOperando;
      default: return segundoOperando;
    }
  }
}