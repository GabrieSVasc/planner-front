import { Categoria } from "./categoria";

export interface Meta {
  id: number;

  descricao: string;

  categoria: Categoria;

  periodo: 'SEMANAL' | 'MENSAL' | 'ANUAL';

  status: 'EM_ANDAMENTO' | 'CUMPRIDA' | 'PARCIAL' | 'NAO_CUMPRIDA';

  data_inicio: string;
  
  data_fim: string;
}