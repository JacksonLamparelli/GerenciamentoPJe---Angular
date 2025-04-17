import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../dataservice.service';
import { Subscription } from 'rxjs';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-contador-acervo',
  imports: [MatTableModule],
  templateUrl: './contador-acervo.component.html',
  styleUrl: './contador-acervo.component.css'
})
export class ContadorAcervoComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | undefined;
  dadosArquivo: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSubscription = this.dataService.dataArquivo$.subscribe(data => {
      this.dadosArquivo = data;
      console.log('Dados do arquivo CSV:', this.dadosArquivo);
            });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
