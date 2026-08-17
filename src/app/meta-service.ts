import { Injectable } from '@angular/core';
import { Meta } from './meta';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private metas: Meta[] = [
    {
      id: 1,
      descricao: 'Meta 1',
      status: 'EM_ANDAMENTO',
      periodo: 'MENSAL',
      inicio: new Date("2026-08-01"),
      fim: new Date("2026-08-31")
    },
    {
      id: 2,
      descricao: 'Meta 2',
      status: 'EM_ANDAMENTO',
      periodo: 'SEMANAL',
      inicio: new Date("2026-07-26"),
      fim: new Date("2026-08-01")
    },
    {
      id: 3,
      descricao: 'Meta 3',
      status: 'EM_ANDAMENTO',
      periodo: 'MENSAL',
      inicio: new Date("2026-08-01"),
      fim: new Date("2026-08-31")
    }
  ];
  
  getMeta(id: number): Meta|undefined{
    return this.metas.find(meta=>meta.id == id);
  }
  
  getMetas(): Meta[]{
    return this.metas;
  }

  removeMeta(id?: number): Observable<void>{
     this.metas = this.metas.filter(meta => meta.id !== id);

    return of(void 0);
  }

  editMeta(metaAtualizada: Meta): Observable<Meta>{
    const index = this.metas.findIndex(meta => meta.id == metaAtualizada.id);
    if(index !==-1){
      this.metas[index] = metaAtualizada;
    }
    return of(metaAtualizada);
  }
  
  createMeta(meta: Meta){
    meta.id = this.metas.length+1
    this.metas.push(meta);
    return of(meta);
  }
}
