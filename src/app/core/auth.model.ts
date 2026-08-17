export interface Usuario {
  id: number;
  nome: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  usuario: Usuario;
}

export interface RegisterResponse {
  message: string;
  usuario: Usuario;
}
