import { Categoria } from "./categoria";
export interface Lembrete {
    id: number;
    descricao: string;
    data_hora: string;
    categoria: Categoria;
    tipo: string;
    recorrente: boolean;
    frequencia: "DIARIA" | "SEMANAL" |"MENSAL"|"ANUAL"|null;
    ativo: boolean
}