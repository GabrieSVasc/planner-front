import { Routes } from '@angular/router';
import { CadastroPage } from './cadastro-page/cadastro-page';
import { LoginPage } from './login-page/login-page';
import { TasksPage } from './tasks-page/tasks-page';
import { BackgroundUser } from './background-user/background-user';
import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { ListMetas } from './list-metas/list-metas';
import { FormMeta } from './form-meta/form-meta';

import { CategoriaList } from './categorias/categoria-list/categoria-list';
import { CategoriaCreate } from './categorias/categoria-create/categoria-create';
import { CategoriaEdit } from './categorias/categoria-edit/categoria-edit';
import { LembreteList } from './lembrete/lembrete-list/lembrete-list';
import { LembreteCreate } from './lembrete/lembrete-create/lembrete-create';
import { LembreteEdit } from './lembrete/lembrete-edit/lembrete-edit';
import { ResumoDia } from './pages/resumo-dia/resumo-dia';
import { ResumoSemana } from './pages/resumo-semana/resumo-semana';
import { ResumoMes } from './pages/resumo-mes/resumo-mes';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    component: CadastroPage,
  },
  {
    path: 'tarefas',
    component: TasksPage,
  },
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

  {
  path: 'resumo-semana',
  component: ResumoSemana
  },

  {
  path: 'resumo-mes',
  component: ResumoMes
  },
];
    {
        path: '',
        component: BackgroundUser,
        children: [
            {
                path: 'login',
                component: LoginPage
            },
            {
                path: 'cadastro',
                component: RegisterPage
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'metas',
        component: ListMetas,
    },
    {
        path: 'metas/criar',
        component: FormMeta
    },
    {
        path: 'metas/editar/:id',
        component: FormMeta
    }
];
