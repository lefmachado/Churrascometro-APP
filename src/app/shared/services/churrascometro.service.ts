import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Carnes } from '../models/carnes.interface';
import { Bebidas } from '../models/bebidas.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {
  private API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  /** MÉTODOS RELACIONADOS A CHURRASCOS */

  // Grava churrasco
  gravarChurrasco(churrasco: any): Observable<any> {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!usuarioLogado || !usuarioLogado.id) {
      throw new Error('Usuário não autenticado. Faça login antes de gravar um churrasco.');
    }

    // Define o usuarioId como um objeto contendo ID e nome
    churrasco.usuarioId = { id: usuarioLogado.id, nome: usuarioLogado.nome };

    return this.httpClient.post(`${this.API_URL}/churrascos`, churrasco).pipe(
      catchError(this.handleError)
    );
  }

  // Busca todos os churrascos
  getChurrascos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_URL}/churrascos`).pipe(
      catchError(this.handleError)
    );
  }

  // Busca churrascos do usuário autenticado
  getChurrascosDoUsuario(): Observable<any[]> {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!usuarioLogado || !usuarioLogado.id) {
      throw new Error('Usuário não autenticado. Faça login.');
    }

    return this.httpClient.get<any[]>(`${this.API_URL}/churrascos`).pipe(
      map((churrascos) =>
        churrascos.filter((churrasco) =>
          churrasco.usuarioId?.id === usuarioLogado.id
        )
      ),
      catchError(this.handleError)
    );
  }

  // Excluir churrasco
  excluirChurrasco(churrascoId: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/churrascos/${churrascoId}`).pipe(
      catchError(this.handleError)
    );
  }

  /** MÉTODOS RELACIONADOS A CARNES E BEBIDAS */

  // Busca as carnes
  getCarnes(): Observable<Carnes[]> {
    return this.httpClient.get<Carnes[]>(`${this.API_URL}/carnes`).pipe(
      catchError(this.handleError)
    );
  }

  // Busca as bebidas
  getBebidas(): Observable<Bebidas[]> {
    return this.httpClient.get<Bebidas[]>(`${this.API_URL}/bebidas`).pipe(
      catchError(this.handleError)
    );
  }

  /** MÉTODOS RELACIONADOS A USUÁRIOS */

  // Cadastro de usuário
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/usuarios`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  // Login de usuário
  fazerLogin(email: string, senha: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.API_URL}/usuarios?email=${email}&senha=${senha}`).pipe(
      catchError(this.handleError)
    );
  }

  /** TRATAMENTO DE ERROS */

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Ocorreu um erro: ', error.message);
    return throwError(() => new Error('Ocorreu um erro ao processar a requisição.'));
  }
}
