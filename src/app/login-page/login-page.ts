import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(
    private userService: UserService,
    private router: Router
  ){}

  loginForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  campoInvalido(campo: string){
    const controle = this.loginForm.get(campo);
    return controle?.invalid && controle?.touched;
  }

  submit(){
    if(this.loginForm.invalid){
      return;
    }
    const nome = this.loginForm.value.nome!;
    const password = this.loginForm.value.password!;
    this.userService.login(nome, password);
  }
}
