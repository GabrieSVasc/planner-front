import { Tarefa } from "../models/tarefa";

export const MOCK_TAREFAS: Tarefa[] = [
  {
    id: 1,
    descricao: "Estudar Angular",
    categoria: "Estudos",
    data: "2026-07-16",
    horario: "19:00",
    prioridade: "Alta",
    status: "Pendente"
  },
  {
    id: 2,
    descricao: "Treino na academia",
    categoria: "Saúde",
    data: "2026-07-16",
    turno: "Manhã",
    prioridade: "Média",
    status: "Executada"
  },
  {
    id: 3,
    descricao: "Comprar materiais",
    categoria: "Compras",
    data: "2026-07-17",
    horario: "15:00",
    prioridade: "Baixa",
    status: "Adiada"
  }
];