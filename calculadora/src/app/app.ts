import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculadora } from './calculadora/calculadora';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Calculadora],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calculadora');
}