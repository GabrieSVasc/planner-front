import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SideMenu } from "../../side-menu/side-menu";
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';
import { Categoria } from '../../models/tarefa.model';
import { Meta } from '../../models/meta';
import { Lembrete } from '../../models/lembrete';

@Component({
  selector: 'app-resumo-dia',
  imports: [CommonModule, SideMenu],
  templateUrl: './resumo-dia.html',
  styleUrl: './resumo-dia.css',
})
export class ResumoDia implements OnInit {
  constructor(
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef
  ){}

  dataAtual = new Date();

  diaTarefas: Tarefa[] = [];
  diaMetas: Meta[] = [];
  diaCategorias: Categoria[] = [];
  diaLembretes: Lembrete[] = [];

  async ngOnInit(){
    this.pegarTarefasData();
  }

  async pegarTarefasData(){
    this.diaTarefas = [];
    this.diaTarefas = await this.tarefaService.listarPorData(this.dataAtual);
    this.cdr.detectChanges();
  }

  async mudarDia(mudar: number){
    this.dataAtual.setDate(this.dataAtual.getDate() +mudar);
    this.dataAtual = new Date(this.dataAtual);
    this.pegarTarefasData();
    
  }

  selecionarDia(diaTarefas: number | null): void {

    if (diaTarefas === null) return;

    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth(),
      diaTarefas
    );

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
    return this.diaTarefas;
  }

  get metasHoje() {
    return this.diaMetas;
  }

  get lembretesHoje() {
    return this.diaLembretes;
  }

  get produtividade(): number {

    const total = this.tarefasHoje.length;

    if (total === 0) {
      return 0;
    }

    const concluidas = this.tarefasHoje.filter(
      tarefa => this.concluida(tarefa)
    ).length;

    return Math.round((concluidas / total) * 100);

  }

  get tarefasConcluidas(): number {

    return this.tarefasHoje.filter(
      tarefa => this.concluida(tarefa)
    ).length;

  }

  concluida(tarefa: Tarefa): boolean{
    if(tarefa.status == "CUMPRIDA"){
      return true;
    }else{
      return false;
    }
  }

  getCorCategoria(id: number){
    return this.diaCategorias[id];
  }
}