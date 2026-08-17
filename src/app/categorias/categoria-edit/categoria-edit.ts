import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-edit',
  imports: [FormsModule],
  templateUrl: './categoria-edit.html',
  styleUrl: './categoria-edit.css',
})
export class CategoriaEdit {

  categoria: Categoria = {
    id: 0,
    nome: '',
    cor: '#3B82F6'
  };

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const categoriaEncontrada = this.categoriaService.getCategoriaById(id);

    if (categoriaEncontrada) {
      this.categoria = { ...categoriaEncontrada };
    }

  }

  salvarCategoria() {

    this.categoriaService.updateCategoria(this.categoria);

    this.router.navigate(['/categorias']);

  }

  cancelar() {
    this.router.navigate(['/categorias']);
  }

}