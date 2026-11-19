import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Produto } from '../models/produto';

/**
 * Camada de serviço do CRUD de produtos.
 * Conversa com a API simulada pelo JSON-Server (db.json).
 */
@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  /** Consulta: lista todos os produtos. */
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  /** Consulta: busca um produto pelo id. */
  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  /** Inclusão: cadastra um novo produto. */
  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  /** Alteração: atualiza um produto existente. */
  alterar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  /** Exclusão: remove um produto. */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
