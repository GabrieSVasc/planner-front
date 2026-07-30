import { Component, OnInit } from '@angular/core';
import { SideMenu } from "../side-menu/side-menu";
import { Meta } from '../meta';
import { MetaService } from '../meta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-metas',
  imports: [SideMenu],
  templateUrl: './list-metas.html',
  styleUrl: './list-metas.css',
})
export class ListMetas implements OnInit {
  constructor(
    private metaService: MetaService,
    private router: Router
  ){}
  metas: Meta[] = [];

  ngOnInit(): void{
    this.renovarLista();
  }
  
  renovarLista(){
    this.metas = this.metaService.getMetas();
  }
  editMeta(id?: number){
    this.router.navigate(['/metas/editar/'+id]);
  }

  removeMeta(id?: number){
    this.metaService.removeMeta(id);
    this.renovarLista();
  }

  to(rota: string){
    this.router.navigate(['/metas/'+rota]);
  }
}
