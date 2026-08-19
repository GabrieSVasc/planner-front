import { CommonModule } from '@angular/common';
import { SideMenu } from '../../side-menu/side-menu';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
@Component({
  selector: 'app-resumo-semana',
  imports: [CommonModule, SideMenu],
  templateUrl: './resumo-semana.html',
  styleUrl: './resumo-semana.css'
})
export class ResumoSemana implements OnInit{
  constructor(
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef,
    private categoriaService: CategoriaService
  ){}

  dataAtual = new Date();
  tarefasDias: {
    data: Date;
    letra: string;
    tarefas: Tarefa[];
  }[] = [];

  categorias: Categoria[] = [];
  inicialSemana = ['S', 'T', 'Q', 'Q', 'S','S','D'];

  mudarSemana(qt: number){
    this.dataAtual.setDate(this.dataAtual.getDate()+qt);
    this.dataAtual = new Date(this.dataAtual);
    this.atualizarSemana();
  }

  async ngOnInit(){
    this.pegarCategorias();
    this.atualizarSemana();
  }
  async pegarCategorias(){
    this.categorias = await this.categoriaService.getCategorias();
    this.cdr.detectChanges();
  }

  async atualizarSemana(){
    const date = this.inicioSemana(this.dataAtual);
    for(let i=0; i<7; i++){
      const dia = new Date(date);
      dia.setDate(date.getDate()+i);
      this.tarefasDias.push({
        data: dia,
        letra: this.inicialSemana[i],
        tarefas: []
      })
    }
    this.cdr.detectChanges();
    for(let i=0; i<7; i++){
      const tarefas = await this.obterTarefasDia(this.tarefasDias[i].data);
      this.tarefasDias[i].tarefas = tarefas;
      this.cdr.detectChanges();
    }
  }

  selecionarDia(dia: number | null): void {

    if (dia === null) return;

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth(),
      dia
    );
    this.atualizarSemana();
  }

  inicioSemana(data: Date): Date {

    const inicio = new Date(data);

    const dia = inicio.getDay();

    const diferenca = dia === 0 ? -6 : 1 - dia;

    inicio.setDate(inicio.getDate() + diferenca);

    return inicio;

  }

  async obterTarefasDia(date: Date): Promise<Tarefa[]>{
    return await this.tarefaService.listarPorData(date);
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