import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resumo-mes',
  imports: [CommonModule],
  templateUrl: './resumo-mes.html',
  styleUrl: './resumo-mes.css'
})
export class ResumoMes {

  dataAtual = new Date(2026, 6, 14);

  get compromissos() {

    const diaSelecionado = this.dataAtual.getDate();

    const dia = this.calendarioMensal.find(
      item => item.numero === diaSelecionado
    );

    if (!dia || dia.eventos.length === 0) {

      return [];

    }

    return dia.eventos.map(evento => ({

      titulo: evento.titulo,

      data: `${String(diaSelecionado).padStart(2, '0')}/${String(
        this.dataAtual.getMonth() + 1
      ).padStart(2, '0')}`,

      categoria: this.nomeCategoria(evento.cor)

    }));

  }

  novaTarefa(): void {

    alert('Tela de tarefas ainda não implementada.');

  }

  mesAnterior(): void {

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth() - 1,
      1
    );

  }

  proximoMes(): void {

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth() + 1,
      1
    );

  }

  selecionarDia(dia: number | null): void {

    if (dia === null) return;

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth(),
      dia
    );

  }

  selecionarDiaGrande(dia: number | string): void {

    if (dia === '') {
      return;
    }

    this.selecionarDia(Number(dia));

  }

  nomeCategoria(cor: string): string {

    switch (cor) {

      case '#D96C75':
        return 'Faculdade';

      case '#66BB6A':
        return 'Saúde';

      case '#42A5F5':
        return 'Estudos';

      case '#E3A33A':
        return 'Compras';

      case '#AB47BC':
        return 'Lazer';

      default:
        return 'Outros';

    }

  }

  get mesAnoGrande(): string {

    const texto = this.dataAtual.toLocaleDateString('pt-BR', {

      month: 'long',

      year: 'numeric'

    });

    return texto.charAt(0).toUpperCase() + texto.slice(1);

  }

  get mesAno(): string {

    const texto = this.dataAtual.toLocaleDateString('pt-BR', {

      month: 'long',

      year: 'numeric'

    });

    return texto.charAt(0).toUpperCase() + texto.slice(1);

  }

  get diaAtual(): number {

    return this.dataAtual.getDate();

  }

  get calendario(): (number | null)[] {

    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    let inicio = primeiroDia.getDay();

    inicio = inicio === 0 ? 6 : inicio - 1;

    const dias: (number | null)[] = [];

    for (let i = 0; i < inicio; i++) {

      dias.push(null);

    }

    for (let i = 1; i <= ultimoDia.getDate(); i++) {

      dias.push(i);

    }

    return dias;

  }

  get calendarioMensal() {

    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const inicioSemana = primeiroDia.getDay();

    const dias: {
     numero: number | string;
      eventos: {
        titulo: string;
        cor: string;
      }[];
    }[] = [];

    for (let i = 0; i < inicioSemana; i++) {

      dias.push({

        numero: '',

        eventos: []

      });

    }

    const eventosMock: {
      [dia: number]: {
        titulo: string;
        cor: string;
      }[];
    } = {

      1: [
        {
          titulo: 'PLP',
          cor: '#D96C75'
        }
      ],

      3: [
        {
          titulo: 'Academia',
          cor: '#66BB6A'
        }
      ],

      5: [
        {
          titulo: 'Estudar',
          cor: '#42A5F5'
        },
        {
          titulo: 'PLP',
          cor: '#D96C75'
        }
      ],

      8: [
        {
          titulo: 'Reunião',
          cor: '#E3A33A'
        }
      ],

      10: [
        {
          titulo: 'Academia',
          cor: '#66BB6A'
        },
        {
          titulo: 'Mercado',
          cor: '#E3A33A'
        },
        {
          titulo: 'PLP',
          cor: '#D96C75'
        }
      ],

      14: [
        {
          titulo: 'Projeto',
          cor: '#42A5F5'
        }
      ],

      17: [
        {
          titulo: 'Academia',
          cor: '#66BB6A'
        }
      ],

      20: [
        {
          titulo: 'Prova',
          cor: '#AB47BC'
        },
        {
          titulo: 'PLP',
          cor: '#D96C75'
        }
      ],

      22: [
        {
          titulo: 'Mercado',
          cor: '#E3A33A'
        }
      ],

      25: [
        {
          titulo: 'Reunião',
          cor: '#42A5F5'
        },
        {
          titulo: 'Academia',
          cor: '#66BB6A'
        }
      ],

      28: [
        {
          titulo: 'Trabalho',
          cor: '#D96C75'
        }
      ],

      30: [
        {
          titulo: 'Descanso',
          cor: '#AB47BC'
        }
      ]

    };

    for (let i = 1; i <= ultimoDia.getDate(); i++) {

      dias.push({

        numero: i,

        eventos: eventosMock[i] ?? []

      });

    }

    return dias;

  }

}