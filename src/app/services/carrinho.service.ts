import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../models/produto';

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  readonly limitePorItem = 12;
  readonly freteGratisAcima = 300;
  private readonly lista = signal<ItemCarrinho[]>([]);
  readonly itens = this.lista.asReadonly();
  readonly cupomAplicado = signal<string | null>(null);
  readonly maiorDeIdade = signal(false);
  private readonly cupons: Record<string, number> = { ADEGA10: 0.1, BEMVINDO: 0.05 };
  readonly totalGarrafas = computed(() => this.itens().reduce((soma, item) => soma + item.quantidade, 0));
  readonly subtotal = computed(() => this.itens().reduce((soma, item) => soma + item.preco * item.quantidade, 0));
  readonly percentualCupom = computed(() => this.cupons[this.cupomAplicado() ?? ''] * 100 || 0);
  readonly desconto = computed(() => Math.round(this.subtotal() * this.percentualCupom()) / 100);
  readonly valorComDesconto = computed(() => this.subtotal() - this.desconto());
  readonly frete = computed(() => !this.itens().length || this.valorComDesconto() >= this.freteGratisAcima ? 0 : 25);
  readonly total = computed(() => this.valorComDesconto() + this.frete());

  limite(item: Produto): number {
    return Math.min(this.limitePorItem, item.estoque);
  }

  podeAdicionar(produto: Produto): boolean {
    const quantidade = this.itens().find(item => item.id === produto.id)?.quantidade ?? 0;
    return quantidade < this.limite(produto);
  }

  adicionar(produto: Produto): void {
    if (!this.podeAdicionar(produto)) return;
    this.lista.update(lista => {
      const existe = lista.some(item => item.id === produto.id);
      return existe
        ? lista.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
        : [...lista, { ...produto, quantidade: 1 }];
    });
  }

  alterarQuantidade(id: number, delta: number): void {
    this.lista.update(lista => lista.map(item => item.id === id
      ? { ...item, quantidade: Math.min(this.limite(item), Math.max(1, item.quantidade + delta)) }
      : item));
  }

  remover(id: number): void {
    this.lista.update(lista => lista.filter(item => item.id !== id));
    if (!this.itens().length) this.limpar();
  }

  aplicarCupom(codigo: string): boolean {
    const normalizado = codigo.trim().toUpperCase();
    if (!Object.hasOwn(this.cupons, normalizado)) return false;
    this.cupomAplicado.set(normalizado);
    return true;
  }

  limpar(): void {
    this.lista.set([]);
    this.cupomAplicado.set(null);
    this.maiorDeIdade.set(false);
  }
}
