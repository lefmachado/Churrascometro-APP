import { Component, OnInit } from '@angular/core';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-meus-churrascos',
  standalone: true,
  imports: [MatSpinner, CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './meus-churrascos.component.html',
  styleUrls: ['./meus-churrascos.component.scss']
})
export class MeusChurrascosComponent implements OnInit {
  churrascos: any[] = []; // Lista de churrascos do usuário
  loading = false; // Flag de carregamento

  constructor(
    private churrascometroService: ChurrascometroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarChurrascosDoUsuario();
  }

  // Método para carregar churrascos do usuário logado
  carregarChurrascosDoUsuario(): void {
    this.loading = true;

    try {
      this.churrascometroService.getChurrascosDoUsuario().subscribe({
        next: (churrascos) => {
          this.churrascos = churrascos;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar churrascos:', error);
          alert('Erro ao carregar seus churrascos.');
          this.loading = false;
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Mensagem de erro se o usuário não estiver autenticado
      } else {
        alert('Erro desconhecido');
      }
      this.router.navigate(['/login']);
    }
  }

  // Método para redirecionar para o resumo de um churrasco
  visualizarChurrasco(churrascoId: string): void {
    this.router.navigate([`/meus-churrascos/${churrascoId}`]);
  }

  // Método para excluir churrasco
  excluirChurrasco(churrascoId: string): void {
    if (confirm('Tem certeza que deseja excluir este churrasco?')) {
      this.loading = true;
      this.churrascometroService.excluirChurrasco(churrascoId).subscribe({
        next: () => {
          alert('Churrasco excluído com sucesso!');
          this.carregarChurrascosDoUsuario(); // Atualiza a lista de churrascos
        },
        error: (err) => {
          console.error('Erro ao excluir churrasco:', err);
          alert('Erro ao excluir o churrasco. Tente novamente.');
          this.loading = false;
        },
      });
    }
  }

  // Método para sair e limpar o localStorage
  sair(): void {
    localStorage.removeItem('usuario'); // Remove o usuário do localStorage
    this.router.navigate(['/']); // Redireciona para a Home
  }
}
