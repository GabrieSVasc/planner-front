import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideMenu } from "../../side-menu/side-menu";
import { CategoriaService } from '../../services/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';
@Component({
  selector: 'app-resumo-mes',
  imports: [CommonModule, SideMenu],
  templateUrl: './resumo-mes.html',
  styleUrl: './resumo-mes.css'
})
export class ResumoMes implements OnInit{

  constructor(
    private tarefaService: TarefaService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef,
  ){}
  ngOnInit(): void {
    this.pegarCategorias();
    this.atualizarMes();
  }
  categorias: Categoria[] = [];
  async pegarCategorias(){
    this.categorias = await this.categoriaService.getCategorias();
    this.cdr.detectChanges();
  }

  dataAtual = new Date();
  ano = this.dataAtual.getFullYear();
  mes = this.dataAtual.getMonth();
  diaUm = new Date(this.ano, this.mes, 1);
  diaFinal = new Date(this.ano, this.mes+1, 0);
  tarefasMes: {
    data: Date|null;
    dia: number| null;
    tarefas: Tarefa[];
  }[] = [];
  async atualizarMes(){
    this.tarefasMes = []
    const date = this.diaUm;
    const quantidadeDias = new Date(this.ano, this.mes + 1, 0).getDate();
    const inicio = this.diaUm.getDay();
    for(let i=0; i<inicio; i++){
      this.tarefasMes.push({
        data: null,
        dia: null,
        tarefas: []
      })
    }
    for (let i = 1; i <= quantidadeDias; i++) {
      const dia = new Date(this.ano, this.mes, i);
      this.tarefasMes.push({
        data: dia,
        dia: i,
        tarefas: []
      })
    }
    this.cdr.detectChanges();
    for (let i = 1; i <= quantidadeDias+inicio; i++) {
      const dia = this.tarefasMes[i];
      if(dia.data){
        dia.tarefas =await this.tarefaService.listarPorData(dia.data);
      }
      this.cdr.detectChanges();
    }
  }

  mudarMes(qt: number){
    this.dataAtual = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth() +qt,
      1
    );
    this.ano = this.dataAtual.getFullYear();
    this.mes = this.dataAtual.getMonth();

    this.diaUm = new Date(this.ano, this.mes, 1);
    this.diaFinal = new Date(this.ano, this.mes + 1, 0);
    this.atualizarMes();
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

    let inicio = this.diaUm.getDay();

    inicio = inicio === 0 ? 6 : inicio - 1;

    const dias: (number | null)[] = [];

    for (let i = 0; i < inicio; i++) {

      dias.push(null);

    }

    for (let i = 1; i <= this.diaFinal.getDate(); i++) {

      dias.push(i);

    }

    return dias;

  }
  compromissos(): Tarefa[]{
    return this.tarefasMes[Number(this.dataAtual.getDate())-1+this.diaUm.getDay()].tarefas;
  }

}