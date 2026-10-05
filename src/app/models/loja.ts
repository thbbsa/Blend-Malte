import { Carrinho } from './carrinho';
import { Cliente } from './cliente';

// Um único objeto importado pelas telas. Compartilha dados apenas em memória.
// Adequado ao protótipo executado no navegador; recarregar a página reinicia os dados.
export const carrinho = new Carrinho();

export class Sessao {
  cliente: Cliente | null = null;

  entrar(email: string, senha: string): boolean {
    const cliente = new Cliente(1, 'Cliente Demonstração', 'cliente@blendmalte.com', '123456', '', '', carrinho);
    if (!cliente.autenticar(email, senha)) return false;
    this.cliente = cliente;
    return true;
  }

  sair(): void {
    this.cliente = null;
  }
}

export const sessao = new Sessao();
