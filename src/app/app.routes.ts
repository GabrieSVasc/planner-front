import { Routes } from '@angular/router';
import { CadastroPage } from './cadastro-page/cadastro-page';
import { LoginPage } from './login-page/login-page';
import { TasksPage } from './tasks-page/tasks-page';

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
];
