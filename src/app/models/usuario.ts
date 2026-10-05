export class Usuario {
  id: number;
  nome: string;
  email: string;
  private senha: string;

  constructor(id: number, nome: string, email: string, senha: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  autenticar(email: string, senha: string): boolean {
    return this.email.trim().toLowerCase() === email.trim().toLowerCase() && this.senha === senha;
  }
}
