import { Usuario } from './usuario';
import { Carrinho } from './carrinho';

export class Cliente extends Usuario {
  cpf: string;
  telefone: string;
  carrinho: Carrinho;
  usuario: string;
  papel: 'cliente' | 'admin';

  constructor(id: number, nome: string, email: string, senha: string,
    cpf: string, telefone: string, carrinho: Carrinho,
    usuario = '', papel: 'cliente' | 'admin' = 'cliente') {
    super(id, nome, email, senha);
    this.cpf = cpf;
    this.telefone = telefone;
    this.carrinho = carrinho;
    this.usuario = usuario;
    this.papel = papel;
  }
}
