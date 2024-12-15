import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { OnInit } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-resumo-churrasco',
  standalone: true,
  imports: [MatSpinner, CommonModule, MatButtonModule],
  templateUrl: './resumo-churrasco.component.html',
  styleUrl: './resumo-churrasco.component.scss'
})
export class ResumoChurrascoComponent implements OnInit {
  churrasco: any;
  loading = true;
  carneKeys: string[] = [];
  bebidaKeys: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private churrascometroService: ChurrascometroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.churrascometroService.getChurrascos().subscribe({
        next: (churrascos) => {
          this.churrasco = churrascos.find((c) => c.id === id);
          if (this.churrasco) {
            this.carneKeys = Object.keys(this.churrasco.carnes || {});
            this.bebidaKeys = Object.keys(this.churrasco.bebidas || {});
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Erro ao carregar o churrasco.');
        },
      });
    }
  }

  voltarParaMeusChurrascos(): void {
    this.router.navigate(['/meus-churrascos']);
  }
}
