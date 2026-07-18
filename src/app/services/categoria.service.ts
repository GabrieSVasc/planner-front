import { Injectable } from '@angular/core';

import { Categoria } from '../models/categoria';
import { MOCK_CATEGORIAS } from '../mock/categorias.mock';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias: Categoria[] = [...MOCK_CATEGORIAS];

  constructor() {}

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  getCategoriaById(id: number): Categoria | undefined {
    return this.categorias.find(c => c.id === id);
  }

  addCategoria(categoria: Categoria): void {
    this.categorias.push(categoria);
  }

  updateCategoria(categoriaAtualizada: Categoria): void {
    const index = this.categorias.findIndex(c => c.id === categoriaAtualizada.id);

    if (index !== -1) {
      this.categorias[index] = categoriaAtualizada;
    }
  }

  deleteCategoria(id: number): void {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }

}