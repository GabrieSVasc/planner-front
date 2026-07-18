import { Routes } from '@angular/router';

import { LoginPage } from './login-page/login-page';

import { CategoriaList } from './categorias/categoria-list/categoria-list';
import { CategoriaCreate } from './categorias/categoria-create/categoria-create';
import { CategoriaEdit } from './categorias/categoria-edit/categoria-edit';
import { LembreteList } from './lembrete/lembrete-list/lembrete-list';
import { LembreteCreate } from './lembrete/lembrete-create/lembrete-create';
import { LembreteEdit } from './lembrete/lembrete-edit/lembrete-edit';
import { ResumoDia } from './pages/resumo-dia/resumo-dia';

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
  },

  {
    path: 'lembretes',
    component: LembreteList
  },
  {
    path: 'lembretes/novo',
    component: LembreteCreate
  },
  {
    path: 'lembretes/editar/:id',
    component: LembreteEdit
  },

  {
    path: 'resumo-dia',
    component: ResumoDia
  },
];