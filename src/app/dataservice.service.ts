import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Garante que haja apenas uma instância do serviço em toda a aplicação
})
export class DataService {
  private dataArquivoSource = new BehaviorSubject<any[]>([]); // Use BehaviorSubject para emitir o valor inicial e o valor atual para novos assinantes
  dataArquivo$ = this.dataArquivoSource.asObservable(); // Expõe um Observable para que os componentes possam se inscrever e receber atualizações

  setDataArquivo(data: any[]): void {
    this.dataArquivoSource.next(data);
  }

  getDataArquivo(): any[] {
    return this.dataArquivoSource.getValue(); // Retorna o valor atual (útil em alguns casos, mas prefira o Observable)
  }
}