import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = "http://localhost:8000/api";
  constructor(private http: HttpClient) { }

  async register(user: User): Promise<User|null>{
    try{
      const response = await fetch(this.apiURL+"/registrar", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      return await response.json();
    }catch(error){
      console.error("Erro ao cadastrar o usuário: ", error);
      return null;
    }
  }

  async login(nome: String, password: string): Promise<boolean>{
    try{
      const response = await fetch(this.apiURL+"/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, password}),
      });
      if(!response.ok){
        throw new Error('Login falhou');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return true;
    }catch(error){
      console.error("Erro ao fazer login: ", error);
      return false;
    }
  }

  async logout(){
    try{
      const response = await fetch(this.apiURL+"/logout", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  "Authorization": `Bearer ${localStorage.getItem('token')}`},
      });
      if(!response.ok){
        throw new Error("Logout falhou");
      }
      localStorage.removeItem('token');
    }catch(error){
      console.error("Erro ao fazer logout: ", error);
    }
  }
}