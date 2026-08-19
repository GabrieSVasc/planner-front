export type TarefaStatus = 'CUMPRIDA' | 'PARCIAL' | 'NAO_CUMPRIDA';
export type TarefaPrioridade = 'ALTA' | 'MEDIA' | 'BAIXA';
export type TarefaTurno = 'MANHA' | 'TARDE' | 'NOITE';

export interface Categoria {
  id: number;
  nome: string;
  cor: string;
  created_at: string;
  updated_at: string;
}

export interface Tarefa {
  id: number;
  usuario_id: number;
  categoria_id: number | null;
  descricao: string;
  status: TarefaStatus;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  turno: TarefaTurno;
  prioridade: TarefaPrioridade;
  created_at: string;
  updated_at: string;
  categoria: Categoria | null;
}

export interface TarefaPayload {
  categoria_id: number | null;
  descricao: string;
  status?: TarefaStatus;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  turno: TarefaTurno;
  prioridade: TarefaPrioridade;
}

export interface TarefaResponse {
  message: string;
  tarefa: Tarefa;
}
