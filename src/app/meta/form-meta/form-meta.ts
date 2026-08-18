import { Component } from '@angular/core';
import { SideMenu } from '../../side-menu/side-menu';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '../../services/meta.service';
import { NewMeta } from '../../services/meta.service';
import { Meta } from '../../models/meta';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { Categoria } from '../../models/categoria';
@Component({
  selector: 'app-form-meta',
  imports: [SideMenu, FormsModule],
  templateUrl: './form-meta.html',
  styleUrl: './form-meta.css',
})

export class FormMeta implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  categoria: Categoria ={
    id: 0,
    cor: '',
    nome: ''
  }
  meta: NewMeta = {
    categoria_id: 0,
    descricao: '',
    status: 'EM_ANDAMENTO',
    periodo: 'SEMANAL',
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: new Date().toISOString().split('T')[0]
  };

  novaData: Date = new Date();

  categorias: Categoria[] = [];

  async ngOnInit(){
    this.categorias = await this.categoriaService.getCategorias();
    this.cdr.detectChanges();
  }

  selectPeriodo(selected: 'SEMANAL'| "MENSAL"| "ANUAL"){
    this.meta.periodo = selected;
  }

  async salvar(){
    let valorPeriodo: number;
    if(this.meta.periodo == "SEMANAL"){
      valorPeriodo = 7;
    }else if(this.meta.periodo == "MENSAL"){
      valorPeriodo = 30;
    }else{
      valorPeriodo=365;
    }
    const dataFim = new Date(this.meta.data_inicio);
    dataFim.setDate(dataFim.getDate()+valorPeriodo);
    const novaMeta: NewMeta = {
      descricao: this.meta.descricao,
      categoria_id: this.meta.categoria_id,
      periodo: this.meta.periodo,
      status: this.meta.status,
      data_inicio: this.meta.data_inicio,
      data_fim: dataFim.toISOString().split('T')[0]
    }
    const response = await this.metaService.createMeta(novaMeta);
    if(response){
      this.to("/metas");
    }else{
      alert("Não foi possível criar esta meta")
    }
  }

  to(rota: string){
    this.router.navigate([rota]);
  }
}
