import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

import { Router } from '@angular/router';

import { SideMenu } from '../../side-menu/side-menu';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, SideMenu],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList {

  categorias: Categoria[] = [];

  constructor(
  private categoriaService: CategoriaService,
  private router: Router
) {
  this.categorias = this.categoriaService.getCategorias();
}

novaCategoria() {
  this.router.navigate(['/categorias/nova']);
}

editarCategoria(id:number){
    this.router.navigate(['/categorias/editar', id]);
}

excluirCategoria(id: number) {

  const confirmar = confirm('Deseja realmente excluir esta categoria?');

  if (confirmar) {
    this.categoriaService.deleteCategoria(id);
    this.categorias = this.categoriaService.getCategorias();
  }

}

}