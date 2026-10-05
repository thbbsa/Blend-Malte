import { Produto } from './produto';

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

// Classe de domínio: não depende do Angular.
export class Carrinho {
  itens: ItemCarrinho[] = [];
  cupomAplicado: string | null = null;
  maiorDeIdade = false;
  limitePorItem = 12;
  freteGratisAcima = 300;

  limite(produto: Produto): number {
    return Math.min(this.limitePorItem, produto.estoque);
  }

  podeAdicionar(produto: Produto): boolean {
    const item = this.itens.find(item => item.id === produto.id);
    const quantidade = item ? item.quantidade : 0;
    return quantidade < this.limite(produto);
  }

  adicionar(produto: Produto): void {
    if (!this.podeAdicionar(produto)) return;
    const item = this.itens.find(item => item.id === produto.id);
    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({ ...produto, quantidade: 1 });
    }
  }

  alterarQuantidade(id: number, delta: number): void {
    const item = this.itens.find(item => item.id === id);
    if (item) {
      item.quantidade = Math.min(this.limite(item), Math.max(1, item.quantidade + delta));
    }
  }

  remover(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
    if (this.itens.length === 0) this.limpar();
  }

  totalGarrafas(): number {
    let quantidade = 0;
    for (const item of this.itens) quantidade += item.quantidade;
    return quantidade;
  }

  subtotal(): number {
    let valor = 0;
    for (const item of this.itens) valor += item.preco * item.quantidade;
    return valor;
  }

  aplicarCupom(codigo: string): boolean {
    const cupom = codigo.trim().toUpperCase();
    if (cupom !== 'ADEGA10' && cupom !== 'BEMVINDO') return false;
    this.cupomAplicado = cupom;
    return true;
  }

  percentualCupom(): number {
    if (this.cupomAplicado === 'ADEGA10') return 10;
    if (this.cupomAplicado === 'BEMVINDO') return 5;
    return 0;
  }

  desconto(): number {
    return Math.round(this.subtotal() * this.percentualCupom()) / 100;
  }

  valorComDesconto(): number {
    return this.subtotal() - this.desconto();
  }

  frete(): number {
    if (this.itens.length === 0 || this.valorComDesconto() >= this.freteGratisAcima) return 0;
    return 25;
  }

  total(): number {
    return this.valorComDesconto() + this.frete();
  }

  limpar(): void {
    this.itens = [];
    this.cupomAplicado = null;
    this.maiorDeIdade = false;
  }
}
