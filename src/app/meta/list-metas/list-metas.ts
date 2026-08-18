import { Component, OnInit } from '@angular/core';
import { SideMenu } from "../../side-menu/side-menu";
import { Meta } from '../../models/meta';
import { MetaService } from '../../services/meta.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-list-metas',
  imports: [SideMenu, FormsModule],
  templateUrl: './list-metas.html',
  styleUrl: './list-metas.css',
})
export class ListMetas implements OnInit {
  constructor(
    private metaService: MetaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}
  metas: Meta[] = [];

  ngOnInit(): void{
    this.renovarLista();
  }
  

  async renovarLista() {
    this.metas = await this.metaService.getMetas();
    this.cdr.detectChanges();
  }

  editMeta(id?: number){
    this.router.navigate(['/metas/editar/'+id]);
  }

  removeMeta(id: number){
    this.metaService.removeMeta(id);
    this.renovarLista();
  }

  to(rota: string){
    this.router.navigate(['/metas/'+rota]);
  }
  concluida(meta: Meta){
    if(meta.status=="CUMPRIDA"){
      return true;
    }
    return false;
  }
}
