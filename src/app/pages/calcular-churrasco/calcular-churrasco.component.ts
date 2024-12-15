import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';

@Component({
  selector: 'app-calcular-churrasco',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './calcular-churrasco.component.html',
  styleUrls: ['./calcular-churrasco.component.scss'],
})
export class CalcularChurrascoComponent implements OnInit {
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;

  loading = false;
  exibirResultados = false;

  carnesLista: any[] = [];
  bebidasLista: any[] = [];

  carnesSelecionadas: any = {};
  bebidasSelecionadas: any = {};

  valorTotalCarnes = 0;
  valorTotalBebidas = 0;
  valorTotal = 0;

  totalCarnes = 0; // Peso total das carnes em kg
  totalBebidas = 0; // Volume total das bebidas em litros

  constructor(
    private fb: FormBuilder,
    private churrascometroService: ChurrascometroService,
    private scrollService: ScrollService,
    private http: HttpClient,
    private router: Router
  ) {
    this.formPessoas = this.fb.group({
      adultos: [0, [Validators.required, Validators.min(1)]],
      criancas: [0],
    });

    this.formCarnes = this.fb.group({}, { validators: this.requireAtLeastOne });
    this.formBebidas = this.fb.group({}, { validators: this.requireAtLeastOne });
  }

  ngOnInit(): void {
    this.churrascometroService.getCarnes().pipe(
      map((carnes) => {
        this.carnesLista = carnes;
        carnes.forEach((carne) => {
          this.formCarnes.addControl(carne.nome, new FormControl(false));
        });
      })
    ).subscribe();

    this.churrascometroService.getBebidas().pipe(
      map((bebidas) => {
        this.bebidasLista = bebidas;
        bebidas.forEach((bebida) => {
          this.formBebidas.addControl(bebida.nome, new FormControl(false));
        });
      })
    ).subscribe();
  }

  calcularPreco(): void {
    if (this.formPessoas.valid && this.formCarnes.valid && this.formBebidas.valid) {
      this.loading = true;

      const { adultos, criancas } = this.formPessoas.value;

      this.valorTotalCarnes = 0;
      this.valorTotalBebidas = 0;

      this.totalCarnes = 0;
      this.totalBebidas = 0;

      this.carnesSelecionadas = {};
      this.bebidasSelecionadas = {};

      // Cálculo das Carnes
      this.carnesLista.forEach((carne) => {
        if (this.formCarnes.get(carne.nome)?.value) {
          const consumoAdulto = (adultos * carne.consumo_medio_adulto_g) / 1000; // Em kg
          const consumoCrianca = (criancas * carne.consumo_medio_crianca_g) / 1000; // Em kg
          const consumoTotal = consumoAdulto + consumoCrianca;
          const precoTotal = consumoTotal * carne.preco_kg;

          this.carnesSelecionadas[carne.nome] = {
            peso: consumoTotal.toFixed(2) + ' kg',
            preco: 'R$ ' + precoTotal.toFixed(2),
          };

          this.valorTotalCarnes += precoTotal;
          this.totalCarnes += consumoTotal;
        }
      });

      // Cálculo das Bebidas
      this.bebidasLista.forEach((bebida) => {
        if (this.formBebidas.get(bebida.nome)?.value) {
          const consumoAdulto = (adultos * bebida.consumo_medio_adulto_ml) / 1000; // Em litros
          const consumoCrianca = (criancas * bebida.consumo_medio_crianca_ml) / 1000; // Em litros
          const consumoTotal = consumoAdulto + consumoCrianca;
          const precoTotal = consumoTotal * bebida.preco_litro;

          this.bebidasSelecionadas[bebida.nome] = {
            peso: consumoTotal.toFixed(2) + ' L',
            preco: 'R$ ' + precoTotal.toFixed(2),
          };

          this.valorTotalBebidas += precoTotal;
          this.totalBebidas += consumoTotal;
        }
      });

      // Soma Total
      this.valorTotal = this.valorTotalCarnes + this.valorTotalBebidas;

      setTimeout(() => {
        this.loading = false;
        this.exibirResultados = true;
      }, 2000);
    }
  }

  requireAtLeastOne(group: FormGroup): { [key: string]: boolean } | null {
    const controls = Object.values(group.controls);
    return controls.some((control) => control.value) ? null : { requireOne: true };
  }

  gravarChurrasco(): void {
    const churrascoData = {
      data: new Date().toISOString(),
      totalAdultos: this.formPessoas.get('adultos')?.value,
      totalCriancas: this.formPessoas.get('criancas')?.value,
      totalCarnes: this.totalCarnes,
      totalBebidas: this.totalBebidas,
      valorTotal: this.valorTotal,
      carnes: this.carnesSelecionadas,
      bebidas: this.bebidasSelecionadas,
    };

    // Redireciona para a página "Meus Churrascos"
    this.router.navigate(['/meus-churrascos']);

    this.churrascometroService.gravarChurrasco(churrascoData).subscribe({
      next: (response) => {
        console.log('Churrasco gravado com sucesso:', response);
        alert('Churrasco gravado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao gravar o churrasco:', error);
        alert('Erro ao gravar o churrasco. Tente novamente.');
      },
    });
  }

  rolarParaTopo(id: string): void {
    this.scrollService.scrollToTop(id);
  }
}
