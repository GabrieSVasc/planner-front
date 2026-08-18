import { CommonModule } from '@angular/common';
import { SideMenu } from '../../side-menu/side-menu';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resumo-semana',
  imports: [CommonModule, SideMenu],
  templateUrl: './resumo-semana.html',
  styleUrl: './resumo-semana.css'
})
export class ResumoSemana {

  dataAtual = new Date(2026, 6, 18);

  semanaAnterior(): void {

    this.dataAtual.setDate(this.dataAtual.getDate() - 7);

    this.dataAtual = new Date(this.dataAtual);

  }

  proximaSemana(): void {

    this.dataAtual.setDate(this.dataAtual.getDate() + 7);

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

  inicioSemana(data: Date): Date {

    const inicio = new Date(data);

    const dia = inicio.getDay();

    const diferenca = dia === 0 ? -6 : 1 - dia;

    inicio.setDate(inicio.getDate() + diferenca);

    return inicio;

  }

  get semana(): string {

    const inicio = this.inicioSemana(this.dataAtual);

    const fim = new Date(inicio);

    fim.setDate(inicio.getDate() + 6);

    return `${inicio.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    })} - ${fim.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    })}`;

  }

  get dias() {

    const inicio = this.inicioSemana(this.dataAtual);

    const semanasMock: Record<string, any[]> = {

      "07-13": [

        [
          { titulo: 'Planejamento', cor: '#D96C75' }
        ],

        [
          { titulo: 'Angular', cor: '#42A5F5' }
        ],

        [
          { titulo: 'Banco de Dados', cor: '#4CAF50' }
        ],

        [
          { titulo: 'Academia', cor: '#E3A33A' }
        ],

        [
          { titulo: 'PLP', cor: '#AB47BC' }
        ],

        [
          { titulo: 'Mercado', cor: '#26A69A' }
        ],

        [
          { titulo: 'Descanso', cor: '#FFCA28' }
        ]

      ],

      "07-20": [

        [
          { titulo: 'Projeto Final', cor: '#EF5350' }
        ],

        [
          { titulo: 'Java', cor: '#42A5F5' }
        ],

        [
          { titulo: 'Engenharia Software', cor: '#66BB6A' }
        ],

        [
          { titulo: 'Comprar Notebook', cor: '#FFA726' }
        ],

        [
          { titulo: 'Treino', cor: '#AB47BC' }
        ],

        [
          { titulo: 'Cinema', cor: '#26C6DA' }
        ],

        [
          { titulo: 'Descanso', cor: '#FFD54F' }
        ]

      ],

      "07-27": [

        [
          { titulo: 'Estudar Redes', cor: '#26A69A' }
        ],

        [
          { titulo: 'Lavar Carro', cor: '#42A5F5' }
        ],

        [
          { titulo: 'Consulta', cor: '#EF5350' }
        ],

        [
          { titulo: 'PLP', cor: '#AB47BC' }
        ],

        [
          { titulo: 'Mercado', cor: '#FFA726' }
        ],

        [
          { titulo: 'Família', cor: '#66BB6A' }
        ],

        [
          { titulo: 'Filme', cor: '#FFD54F' }
        ]

      ]

    };

    const chaveSemana =
      `${String(inicio.getMonth() + 1).padStart(2, '0')}-${String(inicio.getDate()).padStart(2, '0')}`;

    const tarefasSemana =
      semanasMock[chaveSemana] ?? [[], [], [], [], [], [], []];

    const nomes = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

    return nomes.map((nome, indice) => ({

      letra: nome,

      data: new Date(
        inicio.getFullYear(),
        inicio.getMonth(),
        inicio.getDate() + indice
      ),

      tarefas: tarefasSemana[indice]

    }));

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

}