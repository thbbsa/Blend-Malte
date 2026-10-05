import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  imports: [HeaderComponent, Footer, RouterLink],
  selector: 'app-carrinho',
  styleUrl: './carrinho.component.css',
  templateUrl: './carrinho.component.html',
})
export class CarrinhoComponent {
  readonly carrinho = inject(CarrinhoService);
  private readonly router = inject(Router);
  readonly itens = this.carrinho.itens;
  readonly totalGarrafas = this.carrinho.totalGarrafas;
  readonly subtotal = this.carrinho.subtotal;
  readonly cupomAplicado = this.carrinho.cupomAplicado;
  readonly percentualCupom = this.carrinho.percentualCupom;
  readonly desconto = this.carrinho.desconto;
  readonly frete = this.carrinho.frete;
  readonly total = this.carrinho.total;
  readonly maiorDeIdade = this.carrinho.maiorDeIdade;
  readonly mensagemCupom = signal('');
  readonly faltaParaFreteGratis = computed(() => Math.max(0, this.carrinho.freteGratisAcima - this.carrinho.valorComDesconto()));
  readonly progressoFrete = computed(() => Math.min(100, this.carrinho.valorComDesconto() / this.carrinho.freteGratisAcima * 100));

  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  alterarQuantidade(id: number, delta: number): void { this.carrinho.alterarQuantidade(id, delta); }
  remover(id: number): void { this.carrinho.remover(id); }
  limpar(): void { this.carrinho.limpar(); this.mensagemCupom.set(''); }

  aplicarCupom(codigo: string): void {
    this.mensagemCupom.set(this.carrinho.aplicarCupom(codigo) ? '' : codigo.trim() ? 'Cupom inválido ou expirado.' : 'Digite o código do cupom.');
  }

  removerCupom(): void {
    this.cupomAplicado.set(null);
    this.mensagemCupom.set('');
  }

  finalizar(): void {
    if (this.maiorDeIdade() && this.itens().length) this.router.navigate(['/checkout']);
  }
}
