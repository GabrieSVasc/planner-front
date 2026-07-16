import { Injectable } from '@angular/core';

import { Categoria } from '../models/categoria';
import { MOCK_CATEGORIAS } from '../mock/categorias.mock';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() {}

  getCategorias(): Categoria[] {
    return MOCK_CATEGORIAS;
  }
}