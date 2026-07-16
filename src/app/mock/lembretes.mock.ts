import { Lembrete } from "../models/lembrete";

export const MOCK_LEMBRETES: Lembrete[] = [
  {
    id: 1,
    descricao: "Reunião do grupo de PLP",
    data: "2026-07-17",
    recorrente: false,
    categoria: "Faculdade"
  },
  {
    id: 2,
    descricao: "Treino",
    data: "2026-07-18",
    recorrente: true,
    categoria: "Saúde"
  }
];