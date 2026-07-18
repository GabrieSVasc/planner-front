export interface Tarefa {
  id: number;

  descricao: string;

  categoria: string;

  data: string;

  horario?: string;

  turno?: 'Manhã' | 'Tarde' | 'Noite';

  prioridade: 'Baixa' | 'Média' | 'Alta';

  status: 'Pendente' | 'Executada' | 'Parcialmente executada' | 'Cancelada' | 'Adiada';
}