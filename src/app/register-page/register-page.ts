import { Component } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})

export class RegisterPage {
  constructor(private userService: UserService, private router: Router) {}

  registerForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },
  {
    validators: passwordMatchValidator
  }
  );

  campoInvalido(campo: string){
    const controle = this.registerForm.get(campo);
    return controle?.invalid && controle?.touched;
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    const user: User = {
      nome: this.registerForm.value.nome!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    this.userService.register(user);
    this.router.navigate(["/"]);
  }
}

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
}