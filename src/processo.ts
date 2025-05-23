export interface Processo {
    processo: string;
  data_distribuicao: string;
  codigo_classe: string;
  sigla_classe: string;
  classe_judicial: string;
  situacao_atual: string;
  materia: string;
  cod_assunto: string;
  assunto_principal: string;
  orgao_atual: string;
  qtde_autor: string;
  autor: string;
  doc_autor: string;
  qtde_reu: string;
  reu: string;
  doc_reu: string;
  dt_ultimo_movimento: string;
  ultimo_movimento: string;
  tarefa_atual: string;
  data_entrada_tarefa: string;
  valor_causa: string;
  cargo_judicial: string;
  etiquetas: string;
  municipio_autor: string;
  endereco_autor: string;
  municipio_reu: string;
  endereco_reu: string;
  advogado_pa: string;
  advogado_pp: string;
  dpu: string;
  mpf: string;
  dt_evento_primeira_distribuicao: string;
  dt_primeiro_evento: string;
  todas_situacoes: string;
}