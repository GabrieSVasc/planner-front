import { Component } from '@angular/core';
import { SideMenu } from '../../side-menu/side-menu';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '../../services/meta.service';
import { EditMetaI } from '../../services/meta.service';
import { Meta } from '../../models/meta';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-edit-meta',
  imports: [SideMenu, FormsModule],
  templateUrl: './edit-meta.html',
  styleUrl: './edit-meta.css',
})
export class EditMeta implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ){}

  categoria: Categoria ={
    id: 0,
    cor: '',
    nome: ''
  }
  meta: Meta = {
    id: 0,
    categoria: this.categoria,
    descricao: '',
    status: 'EM_ANDAMENTO',
    periodo: 'SEMANAL',
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: new Date().toISOString().split('T')[0]
  };
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const metaEncontrada = await this.metaService.getMeta(Number(id));
      if(metaEncontrada){
        this.meta = metaEncontrada;
        this.categoria = this.meta.categoria;
        this.cdr.detectChanges();
      }
    }
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
    const editMeta: EditMetaI = {
      descricao: this.meta.descricao,
      periodo: this.meta.periodo,
      status: this.meta.status,
      data_fim: dataFim.toISOString().split('T')[0],
      data_inicio: this.meta.data_inicio
    }
    const response = await this.metaService.editMeta(editMeta, this.meta.id);
    if(response){
      this.to("/metas");
    }else{
      alert("Não foi possível editar esta meta");
    }
  }
  to(rota: string){
    this.router.navigate([rota]);
  }
}
