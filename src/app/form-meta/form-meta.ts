import { Component } from '@angular/core';
import { SideMenu } from '../side-menu/side-menu';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '../meta-service';
import { Meta } from '../meta';
import { FormGroup, FormsModule } from '@angular/forms';

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
    private router: Router
  ) {}
  text = "Criar"
  meta: Meta = {
    id: undefined,
    descricao: '',
    status: '',
    periodo: '',
    inicio: new Date(),
    fim: new Date()
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      const metaEncontrada = this.metaService.getMeta(Number(id));
      if(metaEncontrada){
        this.meta = metaEncontrada
      }
      this.text = "Editar"
    }
  }

  selectPeriodo(selected: string){
    this.meta.periodo = selected;
  }

  salvar(){
    if(this.text == "Editar"){
      this.metaService.editMeta(this.meta);
    }else{
      this.metaService.createMeta(this.meta);
    }
    this.router.navigate(["/metas"]);
  }
}
