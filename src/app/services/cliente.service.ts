import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { carrinho } from '../models/loja';
import { environment } from '../../environments/environment';

interface ClienteApi {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  papel: 'cliente' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private url = `${environment.apiUrl}/clientes`;
  constructor(private http: HttpClient) {}

  cadastrar(cliente: Omit<ClienteApi, 'id' | 'papel'>): Observable<ClienteApi> {
    return this.http.get<ClienteApi[]>(this.url).pipe(
      switchMap(clientes => {
        const emailEmUso = clientes.some(item => item.email.toLowerCase() === cliente.email.toLowerCase());
        const usuarioEmUso = clientes.some(item => item.usuario.toLowerCase() === cliente.usuario.toLowerCase());
        if (emailEmUso || usuarioEmUso) return throwError(() => new Error('E-mail ou usuário já cadastrado.'));
        return this.http.post<ClienteApi>(this.url, { ...cliente, papel: 'cliente' });
      }),
    );
  }

  autenticar(email: string, senha: string): Observable<Cliente> {
    const parametros = `?email=${encodeURIComponent(email.trim().toLowerCase())}&senha=${encodeURIComponent(senha)}`;
    return this.http.get<ClienteApi[]>(this.url + parametros).pipe(
      map(clientes => {
        if (!clientes.length) throw new Error('E-mail ou senha incorretos.');
        const dados = clientes[0];
        return new Cliente(dados.id, dados.nome, dados.email, dados.senha, dados.cpf,
          dados.telefone, carrinho, dados.usuario, dados.papel);
      }),
    );
  }
}
