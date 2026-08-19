import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SideMenu } from '../../side-menu/side-menu';
import { LembreteService, NewLembrete } from '../../services/lembrete.service';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'app-lembrete-create',
  imports: [FormsModule, SideMenu],
  templateUrl: './lembrete-create.html',
  styleUrl: './lembrete-create.css',
})
export class LembreteCreate implements OnInit {

  novoLembrete: NewLembrete ={
    descricao: "",
    categoria_id: 0,
    data_hora: "",
    recorrente: false,
    frequencia: null,
    ativo: true
  }

  constructor(
    private lembreteService: LembreteService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  data: string = "";
  hora: string = "";

  categorias: Categoria[] = [];

  async ngOnInit(){
    this.categorias = await this.categoriaService.getCategorias();
  }
  async salvarLembrete() {
    this.novoLembrete.data_hora = this.data + " "+ this.hora+":00"
    const response = await    this.lembreteService.addLembrete(this.novoLembrete);
    if(response){
      this.router.navigate(['/lembretes']);
    }else{
      alert("Não foi possível criar este lembrete")
    }
  }

  cancelar() {
    this.router.navigate(['/lembretes']);
  }

  naoRecorrente(){
    this.novoLembrete.frequencia = null;
  }
}