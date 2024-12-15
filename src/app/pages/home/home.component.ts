import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  irSemCadastro() {
    // Limpa o cache de login no localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('user');

    // Navega para a rota desejada
    this.router.navigate(['/churrasco/novo']);
  }
}
