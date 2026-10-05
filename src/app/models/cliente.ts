import { Usuario } from './usuario';
import { Carrinho } from './carrinho';

export class Cliente extends Usuario {
  cpf: string;
  telefone: string;
  carrinho: Carrinho;

  constructor(id: number, nome: string, email: string, senha: string,
    cpf: string, telefone: string, carrinho: Carrinho) {
    super(id, nome, email, senha);
    this.cpf = cpf;
    this.telefone = telefone;
    this.carrinho = carrinho;
  }
}
