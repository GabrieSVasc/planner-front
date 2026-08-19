import { Component, OnInit } from '@angular/core';
import { MesProdutivo, RelatorioCategoria, RelatorioService, RelatoriosMetasTarefas, SemanaProdutiva, Turno } from '../../services/relatorio.service';
import { SideMenu } from '../../side-menu/side-menu';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-relatorios',
  imports: [SideMenu, DecimalPipe],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios implements OnInit {
  constructor(
    private relatorioService: RelatorioService,
    private cdr: ChangeDetectorRef
  ){}
  periodoVisualizado = "";
  metas: RelatoriosMetasTarefas = {
    cumpridas: 0,
    total:0,
    porcentagem: 0
  };

  tarefas: RelatoriosMetasTarefas = {
    cumpridas: 0,
    total:0,
    porcentagem: 0
  };

  metasCat: RelatorioCategoria[] =[];
  tarefasCat: RelatorioCategoria[]=[];
  turnos: Turno[] = [];
  semanas: SemanaProdutiva[] = [];
  meses: MesProdutivo[] = [];
  ngOnInit(){
    this.periodoVisualizado = "Turnos"
    this.tudo();
  }
  async tudo(){
    this.metas = await this.relatorioService.getRelatorioMetas();
    this.cdr.detectChanges();
    this.tarefas = await this.relatorioService.getRelatorioTarefas();
    this.cdr.detectChanges();
    this.metasCat = await this.relatorioService.getRelatorioCatMetas();
    this.cdr.detectChanges();
    this.tarefasCat = await this.relatorioService.getRelatorioCatTarefas();
    this.cdr.detectChanges();
    this.turnos = await this.relatorioService.getRelatorioProdTurno();
    this.cdr.detectChanges();
    this.semanas = await this.relatorioService.getRelatorioProdSemana();
    this.cdr.detectChanges();
    this.meses = await this.relatorioService.getRelatorioProdMes();
    this.cdr.detectChanges();

  }

  porcentagemMetas(valor: number){
    return (valor/this.totalMetas())*100;
  }

  totalMetas(){
    let soma = 0;
    for (let index = 0; index < this.metasCat.length; index++) {
      soma += this.metasCat[index].total;
    }
    return soma;
  }

  porcentagemTarefas(valor: number){
    return (valor/this.totalTarefas())*100;
  }

  totalTarefas(){
    let soma = 0;
    for (let index = 0; index < this.tarefasCat.length; index++) {
      soma += this.tarefasCat[index].total;
    }
    return soma;
  }

  escolhePeriodos(periodo: string){
    this.periodoVisualizado = periodo;
  }

  porcentagemTurno(valor: number){
    return (valor/this.totalTurno())*100;
  }
  totalTurno(){
    let soma = 0;
    for (let index = 0; index < this.turnos.length; index++) {
      soma += this.turnos[index].total;
    }
    return soma;
  }

  porcentagemSemana(valor: number){
    return (valor/this.totalSemana())*100;
  }
  totalSemana(){
    let soma = 0;
    for (let index = 0; index < this.semanas.length; index++) {
      soma += this.semanas[index].total;
    }
    return soma;
  }

  porcentagemMes(valor: number){
    return (valor/this.totalMes())*100;
  }

  totalMes(){
    let soma = 0;
    for (let index = 0; index < this.meses.length; index++) {
      soma += this.semanas[index].total;
    }
    return soma;
  }
}
