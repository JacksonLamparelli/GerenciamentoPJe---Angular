import { Component } from '@angular/core';
import { ImportadorCsvComponent } from './csv-upload/csv-upload.component';
import { ContadorAcervoComponent } from './contador-acervo/contador-acervo.component';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  imports: [ImportadorCsvComponent, ContadorAcervoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DashoboardPJe';
}
