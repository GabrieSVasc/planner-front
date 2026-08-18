import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria } from '../../models/categoria';
import { CategoriaService, NovaCategoria } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-create',
  imports: [FormsModule],
  templateUrl: './categoria-create.html',
  styleUrl: './categoria-create.css',
})
export class CategoriaCreate {

  categoria: NovaCategoria = {
    nome: '',
    cor: '#000000'
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  async salvarCategoria() {
    const response = await this.categoriaService.addCategoria(this.categoria);
    if(response){
      this.router.navigate(['/categorias']);
    }else{
      alert("Erro ao criar uma nova categoria");
    }
  }

  cancelar() {
    this.router.navigate(['/categorias']);
  }

}