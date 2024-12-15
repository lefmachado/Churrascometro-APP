import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChurrascometroService } from '../services/churrascometro.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, RouterModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private churrascometroService: ChurrascometroService
  ) {}

  ngOnInit(): void {
    this.verificarUsuarioLogado();
    this.initLoginForm();
  }

  // Verifica se o usuário já está salvo no localStorage
  private verificarUsuarioLogado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.router.navigate(['/meus-churrascos']);
    }
  }

  // Inicializa o formulário
  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  fazerLogin(): void {
    // Verifica se o formulário está inválido
    if (this.loginForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const { email, senha } = this.loginForm.value;

    // Realiza a chamada ao serviço para login
    this.churrascometroService.fazerLogin(email, senha).subscribe({
      next: (usuarios: any[]) => {
        // Verifica se a resposta contém algum usuário
        if (usuarios && usuarios.length > 0) {
          const usuarioLogado = usuarios[0];

          // Salva o usuário no localStorage
          localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

          // Exibe mensagem de boas-vindas e redireciona
          alert(`Bem-vindo, ${usuarioLogado.nome}!`);
          this.router.navigate(['/meus-churrascos']);
        } else {
          // Caso não encontre o usuário, exibe mensagem de erro
          alert('Email ou senha inválidos. Verifique suas credenciais.');
        }
      },
      error: (erro) => {
        console.error('Erro ao tentar fazer login:', erro);
        alert('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
      },
    });
  }
}
