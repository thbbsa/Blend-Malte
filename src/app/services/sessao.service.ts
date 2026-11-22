import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class SessaoService {
  cliente: Cliente | null = null;

  entrar(cliente: Cliente): void { this.cliente = cliente; }
  sair(): void { this.cliente = null; }
}
