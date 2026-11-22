import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCarrinho } from '../models/carrinho';
import { environment } from '../../environments/environment';

export interface Venda {
  id?: number;
  cliente: { nome: string; cpf: string; email: string; telefone: string };
  endereco: { cep: string; endereco: string; numero: string; complemento: string; bairro: string; cidade: string; estado: string };
  itens: ItemCarrinho[];
  subtotal: number;
  desconto: number;
  frete: number;
  total: number;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class VendaService {
  constructor(private http: HttpClient) {}
  registrar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${environment.apiUrl}/vendas`, venda);
  }
}
