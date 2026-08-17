import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(payload: LoginPayload) {
    return this.http.post<LoginResponse>(`${API_BASE_URL}/login`, payload).pipe(
      tap((response) => {
        localStorage.setItem('planner_token', response.token);
        localStorage.setItem('planner_usuario', JSON.stringify(response.usuario));
        void this.router.navigate(['/tarefas']);
      }),
    );
  }

  registrar(payload: RegisterPayload) {
    return this.http.post<RegisterResponse>(`${API_BASE_URL}/registrar`, payload);
  }

  logout() {
    localStorage.removeItem('planner_token');
    localStorage.removeItem('planner_usuario');
    void this.router.navigate(['/']);
  }
}
