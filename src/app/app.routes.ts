import { Routes } from '@angular/router';

import { LoginPage } from './login-page/login-page';

import { CategoriaList } from './categorias/categoria-list/categoria-list';
import { CategoriaCreate } from './categorias/categoria-create/categoria-create';
import { CategoriaEdit } from './categorias/categoria-edit/categoria-edit';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },

  {
    path: 'categorias',
    component: CategoriaList
  },

  {
    path: 'categorias/nova',
    component: CategoriaCreate
  },

  {
    path: 'categorias/editar/:id',
    component: CategoriaEdit
  }
];