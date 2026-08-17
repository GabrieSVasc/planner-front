import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-create',
  imports: [FormsModule],
  templateUrl: './categoria-create.html',
  styleUrl: './categoria-create.css',
})
export class CategoriaCreate {

  categoria: Categoria = {
    id: 0,
    nome: '',
    cor: '#000000'
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  salvarCategoria() {

    const novaCategoria: Categoria = {
      ...this.categoria,
      id: Date.now()
    };

    this.categoriaService.addCategoria(novaCategoria);

    this.router.navigate(['/categorias']);
  }

  cancelar() {
    this.router.navigate(['/categorias']);
  }

}