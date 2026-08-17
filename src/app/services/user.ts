import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private users: User[] = [
      {
        id: 1,
        nome: 'User',
        email: 'User@gmail.com',
        password: 'abc123'
      },
      {
        id: 2,
        nome: 'User123',
        email: 'User123@gmail.com',
        password: 'abc12345'
      }
    ];
  register(user: User){
    user.id = this.users.length+1;
    this.users.push(user);
  }

  login(nome: String, password: string): User|undefined{
    const logado = this.users.find(user => user.nome==nome && user.password==password);
    return logado;
  }

  logout(){
  }
}