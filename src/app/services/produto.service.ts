import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private url = `${environment.apiUrl}/produtos`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> { return this.http.get<Produto[]>(this.url); }
  criar(produto: Omit<Produto, 'id'>): Observable<Produto> { return this.http.post<Produto>(this.url, produto); }
  atualizar(produto: Produto): Observable<Produto> { return this.http.put<Produto>(`${this.url}/${produto.id}`, produto); }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
