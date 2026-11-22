import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly url = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  incluir(produto: Omit<Produto, 'id'> | Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, produto);
  }

  criar(produto: Omit<Produto, 'id'>): Observable<Produto> {
    return this.incluir(produto);
  }

  alterar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${id}`, produto);
  }

  atualizar(produto: Produto): Observable<Produto> {
    if (produto.id === undefined) {
      throw new Error('Não é possível atualizar um produto sem identificador.');
    }
    return this.alterar(produto.id, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
