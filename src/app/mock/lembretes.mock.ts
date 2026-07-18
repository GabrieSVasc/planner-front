import { Lembrete } from '../models/lembrete';

export const MOCK_LEMBRETES: Lembrete[] = [

    {
        id: 1,
        descricao: 'Reunião de PLP',
        categoria: 'Faculdade',
        tipo: 'Reunião',
        data: '2026-07-20',
        horario: '19:00',
        recorrente: false
    },

    {
        id: 2,
        descricao: 'Treino de Academia',
        categoria: 'Saúde',
        tipo: 'Exercício',
        data: '2026-07-21',
        horario: '18:00',
        recorrente: true
    },

    {
        id: 3,
        descricao: 'Comprar material',
        categoria: 'Compras',
        tipo: 'Compras',
        data: '2026-07-22',
        horario: '15:00',
        recorrente: false
    }

];