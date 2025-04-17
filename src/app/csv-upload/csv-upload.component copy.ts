import { Component } from '@angular/core';
import { DataService } from '../dataservice.service';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-importador-csv',
  template: `
    <input type="file" (change)="onFileChange($event)">
  `
})
export class ImportadorCsvComponent {
  constructor(private dataService: DataService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.lerArquivoCsv(file);
    }
  }

  lerArquivoCsv(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const conteudo = e.target.result;
      const dados = this.parseCsv(conteudo); // Sua lógica para parsear o CSV
      this.dataService.setDataArquivo(dados); // Envia os dados para o serviço
      console.log(dados)
    };
    reader.readAsText(file);
    
  }

  parseCsv(csv: string): any[] {
    // Implemente sua lógica de parsing de CSV aqui
    const linhas = csv.trim().split('\n');
    const cabecalho = linhas[0].split(',');
    const dados = [];
    for (let i = 1; i < linhas.length; i++) {
      const valores = linhas[i].split(',');
      const objeto: any = {};
      for (let j = 0; j < cabecalho.length; j++) {
        objeto[cabecalho[j].trim()] = valores[j].trim();
      }
      dados.push(objeto);
    }
    return dados;
    
  }
 
}

export interface Processo {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: Processo[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];