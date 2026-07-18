import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-dia',
  imports: [CommonModule],
  templateUrl: './resumo-dia.html',
  styleUrl: './resumo-dia.css',
})
export class ResumoDia implements OnInit {

  dataAtual = new Date(2026, 6, 18);

  dadosMock = {

    18: {

      tarefas: [

        {
          titulo: 'Estudar Angular',
          cor: '#D96C75',
          concluida: false
        },

        {
          titulo: 'Comprar material',
          cor: '#E3A33A',
          concluida: true
        }

      ],

      metas: [

        {
          titulo: 'Aprender Angular',
          cor: '#D8D76A'
        }

      ],

      lembretes: [

        {
          data: '18/07',
          titulo: 'Reunião PLP',
          recorrente: true
        }

      ]

    },

    19: {

      tarefas: [

        {
          titulo: 'Academia',
          cor: '#4CAF50',
          concluida: true
        },

        {
          titulo: 'Projeto Banco de Dados',
          cor: '#42A5F5',
          concluida: false
        }

      ],

      metas: [

        {
          titulo: 'Meta da semana',
          cor: '#FFCA28'
        }

      ],

      lembretes: [

        {
          data: '19/07',
          titulo: 'Dentista',
          recorrente: false
        }

      ]

    },

    20: {

      tarefas: [

        {
          titulo: 'Comprar mercado',
          cor: '#AB47BC',
          concluida: false
        }

      ],

      metas: [

        {
          titulo: 'Economizar dinheiro',
          cor: '#26A69A'
        }

      ],

      lembretes: [

        {
          data: '20/07',
          titulo: 'Pagar boleto',
          recorrente: false
        }

      ]

    }

  };

  ngOnInit(): void {}

  diaAnterior(): void {

    this.dataAtual.setDate(this.dataAtual.getDate() - 1);
    this.dataAtual = new Date(this.dataAtual);

  }

  proximoDia(): void {

    this.dataAtual.setDate(this.dataAtual.getDate() + 1);
    this.dataAtual = new Date(this.dataAtual);

  }

  selecionarDia(dia: number | null): void {

    if (dia === null) return;

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth(),
      dia
    );

  }

  novaTarefa(): void {

    alert('Tela de criação de tarefas ainda não implementada.');

  }

  get dataFormatada(): string {

    return this.dataAtual.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });

  }

  get nomeDia(): string {

    return this.dataAtual.toLocaleDateString('pt-BR', {
      weekday: 'long'
    });

  }

  get mesAno(): string {

    return this.dataAtual.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });

  }

  get diaAtual(): number {

    return this.dataAtual.getDate();

  }

  get calendario(): (number | null)[] {

    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const quantidadeDias = ultimoDia.getDate();

    let inicioSemana = primeiroDia.getDay();

    inicioSemana = inicioSemana === 0 ? 6 : inicioSemana - 1;

    const dias: (number | null)[] = [];

    for (let i = 0; i < inicioSemana; i++) {
      dias.push(null);
    }

    for (let i = 1; i <= quantidadeDias; i++) {
      dias.push(i);
    }

    return dias;

  }

  get tarefasHoje() {

    return this.dadosMock[this.diaAtual as keyof typeof this.dadosMock]?.tarefas ?? [];

  }

  get metasHoje() {

    return this.dadosMock[this.diaAtual as keyof typeof this.dadosMock]?.metas ?? [];

  }

  get lembretesHoje() {

    return this.dadosMock[this.diaAtual as keyof typeof this.dadosMock]?.lembretes ?? [];

  }

  get produtividade(): number {

    const total = this.tarefasHoje.length;

    if (total === 0) {
      return 0;
    }

    const concluidas = this.tarefasHoje.filter(
      tarefa => tarefa.concluida
    ).length;

    return Math.round((concluidas / total) * 100);

  }

  get tarefasConcluidas(): number {

    return this.tarefasHoje.filter(
      tarefa => tarefa.concluida
    ).length;

  }

}