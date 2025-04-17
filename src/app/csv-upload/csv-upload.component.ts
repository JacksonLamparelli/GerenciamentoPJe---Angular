import { AfterViewInit, Component } from '@angular/core';
import * as Papa from 'papaparse';
import { Processo } from '../../processo';
import { 
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
} from 'chart.js';
import fsp from 'node:fs/promises';

@Component({
  selector: 'app-importador-csv',
  styleUrl: '../csv-upload/csv-upload.component.css',
  templateUrl: '../csv-upload/csv-upload.component.html',
})
export class ImportadorCsvComponent {
  constructor() {Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    BarController,
    BarElement    
  );}

  acervo: Processo[] = [];
  instanciaSuperior: Processo[] = [];
  andamento: Processo[] = [];
  julgado: Processo[] = [];
  sobrestado: Processo[] = [];
  hastas: Processo[] = [];
  digitalizado: Processo[] = [];
  plantao: Processo[] = [];
  relatado: Processo[] = [];
  inquerito: Processo[] = [];
  criminais: Processo[] = [];

  
  criarGrafico(): void {
    const data = [
      { situacao: "Fase Instrutória", count: this.andamento.length },
      { situacao: "Julgados", count: this.julgado.length },
      { situacao: "Sobrestados", count: this.sobrestado.length },
      { situacao: "Em Instância Superior", count: this.instanciaSuperior.length },
      { situacao: "CEHAS", count: this.hastas.length },
      { situacao: "Digitalizado", count: this.digitalizado.length },
      { situacao: "Solicitado atendimento em Plantão", count: this.plantao.length },
      { situacao: "Inquéritos Relatados", count: this.relatado.length },
      { situacao: "Inquéritos Não Relatados", count: this.inquerito.length },
    ];

    const ctx = document.getElementById('myChart') as HTMLCanvasElement; // Garante que o elemento é um canvas
    if (ctx) {
      new Chart(
        ctx,
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.situacao),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    } else {
      console.error('Elemento canvas com ID "acquisitions" não encontrado.');
    }
  }
    
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      delimiter: ';',
      complete: (result: Papa.ParseResult<any[]>) => {
        const linhas = result.data as string[][];

        // Remove o cabeçalho
        linhas.shift();

        const processos: Processo[] = linhas.map(this.processaLinhaArray);
        const acervo = this.removerDuplicatas(processos);
        this.acervo = acervo;
        this.instanciaSuperior = this.emInstanciaSuperior(acervo);
        this.andamento = this.emAndamento(acervo);
        this.julgado = this.emJulgados(acervo);
        this.sobrestado = this.emSobrestados(acervo);
        this.hastas = this.emHasta(processos);
        this.digitalizado = this.emDigitalizado(processos);
        this.relatado = this.emRelatado(acervo);
        this.inquerito = this.emInqueritoPolicial(acervo);
        this.plantao = this.emPlantao(acervo);
        this.criminais = this.feitosCriminais(acervo);

        this.criarGrafico();
        },
      error: (err) => {
        console.error('Erro ao processar o CSV:', err);
      },
    });
 
  }

  

  removerDuplicatas(processos: Processo[]): Processo[] {
    const acervo: Processo[] = [];
    const processosUnicos = new Set();

    for (let processo of processos) {
      if (!processosUnicos.has(processo.processo)) {
        processosUnicos.add(processo.processo);
        acervo.push(processo);
      }
    }

    return acervo;
  }

  emInstanciaSuperior(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Em Instância Superior'
    );
  }

  emAndamento(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Andamento'
    );
  }

  emSobrestados(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Sobrestado'
    );
  }

  emJulgados(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Julgado'
    );
  }

  emInqueritoPolicial(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Inquérito Policial'
    );
  }

  emRelatado(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Relatado'
    );
  }

  emHasta(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) =>
        processo.situacao_atual ===
        'Central de Hastas Públicas Unificadas de São Paulo'
    );
  }

  emDigitalizado(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) => processo.situacao_atual === 'Digitalizado'
    );
  }

  emPlantao(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) =>
        processo.situacao_atual ===
        'Solicitado atendimento em plantão judiciário'
    );
  }

  feitosCriminais(processos: Processo[]): Processo[] {
    return processos.filter(
      (processo) =>
        processo.materia === 'DIREITO PENAL' || processo.materia === 'DIREITO PROCESSUAL PENAL'
    );
  }
   
  processaLinhaArray(colunas: string[]): Processo {
    const [
      processo,
      data_distribuicao,
      codigo_classe,
      sigla_classe,
      classe_judicial,
      situacao_atual,
      materia,
      cod_assunto,
      assunto_principal,
      orgao_atual,
      qtde_autor,
      autor,
      doc_autor,
      qtde_reu,
      reu,
      doc_reu,
      dt_ultimo_movimento,
      ultimo_movimento,
      tarefa_atual,
      data_entrada_tarefa,
      valor_causa,
      cargo_judicial,
      etiquetas,
      municipio_autor,
      endereco_autor,
      municipio_reu,
      endereco_reu,
      advogado_pa,
      advogado_pp,
      dpu,
      mpf,
      dt_evento_primeira_distribuicao,
      dt_primeiro_evento,
      todas_situacoes,
    ] = colunas;

    return {
      processo,
      data_distribuicao,
      codigo_classe,
      sigla_classe,
      classe_judicial,
      situacao_atual,
      materia,
      cod_assunto,
      assunto_principal,
      orgao_atual,
      qtde_autor,
      autor,
      doc_autor,
      qtde_reu,
      reu,
      doc_reu,
      dt_ultimo_movimento,
      ultimo_movimento,
      tarefa_atual,
      data_entrada_tarefa,
      valor_causa,
      cargo_judicial,
      etiquetas,
      municipio_autor,
      endereco_autor,
      municipio_reu,
      endereco_reu,
      advogado_pa,
      advogado_pp,
      dpu,
      mpf,
      dt_evento_primeira_distribuicao,
      dt_primeiro_evento,
      todas_situacoes,
    };
  }

}


