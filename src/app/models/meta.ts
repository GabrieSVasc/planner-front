export interface Meta {
  id: number;

  descricao: string;

  categoria: string;

  periodo: 'Semanal' | 'Mensal' | 'Anual';

  status: 'Com sucesso' | 'Parcialmente atingida' | 'Sem sucesso';
}