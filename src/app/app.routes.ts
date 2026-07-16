import { Routes } from '@angular/router';
import { BackgroundUser } from './background-user/background-user';
import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { ListMetas } from './list-metas/list-metas';

export const routes: Routes = [
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
    }
];
