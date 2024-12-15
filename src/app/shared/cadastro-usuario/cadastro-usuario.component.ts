import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChurrascometroService } from '../services/churrascometro.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink, MatInputModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private churrascometroService: ChurrascometroService,
    private router: Router
  ) {
    // Inicializa o formulário de cadastro
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para cadastrar usuário
  cadastrarUsuario(): void {
    if (this.cadastroForm.valid) {
      const novoUsuario = this.cadastroForm.value;

      this.churrascometroService.cadastrarUsuario(novoUsuario).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso! Faça login para continuar.');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Erro ao cadastrar usuário. Tente novamente.');
        },
      });
    }
  }
}
