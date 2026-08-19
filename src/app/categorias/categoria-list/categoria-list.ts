import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { SideMenu } from "../../side-menu/side-menu";

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, SideMenu],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList implements OnInit{

  categorias: Categoria[] = [];

  constructor(
  private categoriaService: CategoriaService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

async ngOnInit() {
  try {
    this.categorias = await this.categoriaService.getCategorias();
    this.cdr.detectChanges();
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    alert('Erro ao carregar categorias');
  }
}
novaCategoria() {
  this.router.navigate(['/categorias/nova']);
}

editarCategoria(id:number){
    this.router.navigate(['/categorias/editar', id]);
}

  async excluirCategoria(id: number) {

    const confirmar = confirm('Deseja realmente excluir esta categoria?');

    if (confirmar) {
      this.categoriaService.deleteCategoria(id);
      this.categorias = await this.categoriaService.getCategorias();
      this.cdr.detectChanges();
    }
  }
}