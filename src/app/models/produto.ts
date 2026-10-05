export class Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  imagem: string;
  descricao: string;

  constructor(id: number, nome: string, categoria: string, preco: number,
    estoque: number, imagem: string, descricao: string) {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
    this.estoque = estoque;
    this.imagem = imagem;
    this.descricao = descricao;
  }
}
