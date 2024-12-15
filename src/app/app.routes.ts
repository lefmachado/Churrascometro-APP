import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CalcularChurrascoComponent } from './pages/calcular-churrasco/calcular-churrasco.component';
import { MeusChurrascosComponent } from './pages/meus-churrascos/meus-churrascos.component';
import { ResumoChurrascoComponent } from './pages/resumo-churrasco/resumo-churrasco.component';
import { CadastroUsuarioComponent } from './shared/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './shared/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  {
    path: 'churrasco',
    children: [{
      path: 'novo',
      component: CalcularChurrascoComponent
    }]
  },
  { path: 'meus-churrascos', component: MeusChurrascosComponent },
  { path: 'meus-churrascos/:id', component: ResumoChurrascoComponent },
  { path: 'nao-encontrado', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];
