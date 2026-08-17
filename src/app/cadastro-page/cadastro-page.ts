import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-cadastro-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-page.html',
  styleUrl: './cadastro-page.css',
})
export class CadastroPage {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly cadastroForm = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password_confirmation: ['', [Validators.required]],
  });

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  onSubmit(): void {
    if (this.cadastroForm.invalid || this.isSubmitting) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    if (this.cadastroForm.controls.password.value !== this.cadastroForm.controls.password_confirmation.value) {
      this.errorMessage = 'A confirmacao de senha precisa ser igual a senha.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.authService.registrar(this.cadastroForm.getRawValue()).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.isSubmitting = false;
        setTimeout(() => {
          void this.router.navigate(['/']);
        }, 1200);
      },
      error: (error) => {
        this.errorMessage = this.extrairMensagemErro(error.error);
        this.isSubmitting = false;
      },
    });
  }

  mensagemErroCampo(campo: 'nome' | 'email' | 'password' | 'password_confirmation'): string {
    const control = this.cadastroForm.controls[campo];

    if (!control.touched && !control.dirty) {
      return '';
    }

    if (control.hasError('required')) {
      switch (campo) {
        case 'nome':
          return 'Informe seu nome.';
        case 'email':
          return 'Informe seu email.';
        case 'password':
          return 'Informe uma senha.';
        case 'password_confirmation':
          return 'Confirme sua senha.';
      }
    }

    if (campo === 'nome' && control.hasError('maxlength')) {
      return 'O nome pode ter no maximo 255 caracteres.';
    }

    if (campo === 'email' && control.hasError('email')) {
      return 'Informe um email valido.';
    }

    if (campo === 'password' && control.hasError('minlength')) {
      return 'A senha precisa ter pelo menos 4 caracteres.';
    }

    if (
      campo === 'password_confirmation' &&
      this.cadastroForm.controls.password.value &&
      control.value &&
      this.cadastroForm.controls.password.value !== control.value
    ) {
      return 'A confirmacao precisa ser igual a senha.';
    }

    return '';
  }

  private extrairMensagemErro(errorBody: { message?: string; errors?: Record<string, string[]> } | undefined): string {
    const backendErrors = errorBody?.errors;

    if (backendErrors) {
      const primeiroCampo = Object.keys(backendErrors)[0];
      const primeiraMensagem = backendErrors[primeiroCampo]?.[0];

      if (primeiraMensagem) {
        return this.normalizarMensagemBackend(primeiraMensagem);
      }
    }

    if (errorBody?.message) {
      return this.normalizarMensagemBackend(errorBody.message);
    }

    return 'Nao foi possivel concluir o cadastro.';
  }

  private normalizarMensagemBackend(message: string): string {
    const mensagensConhecidas: Record<string, string> = {
      'The email has already been taken.': 'Este email ja esta em uso.',
      'The password field confirmation does not match.': 'A confirmacao de senha precisa ser igual a senha.',
      'The nome field is required.': 'Informe seu nome.',
      'The email field is required.': 'Informe seu email.',
      'The email field must be a valid email address.': 'Informe um email valido.',
      'The password field is required.': 'Informe uma senha.',
      'The password field must be at least 4 characters.': 'A senha precisa ter pelo menos 4 caracteres.',
      'The nome field must not be greater than 255 characters.': 'O nome pode ter no maximo 255 caracteres.',
      'The email field must not be greater than 255 characters.': 'O email pode ter no maximo 255 caracteres.',
      'Server Error': 'Ocorreu um erro no servidor. Tente novamente em instantes.',
    };

    return mensagensConhecidas[message] ?? message;
  }
}
