import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { carrinho } from '../../models/loja';

@Component({
  imports: [HeaderComponent, Footer, RouterLink],
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-carrinho',
  styleUrl: './carrinho.component.css',
  templateUrl: './carrinho.component.html',
})
export class CarrinhoComponent {
  carrinho = carrinho;
  private router = inject(Router);
  mensagemCupom = '';

  faltaParaFreteGratis(): number {
    return Math.max(0, this.carrinho.freteGratisAcima - this.carrinho.valorComDesconto());
  }

  progressoFrete(): number {
    return Math.min(100, this.carrinho.valorComDesconto() / this.carrinho.freteGratisAcima * 100);
  }

  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  alterarQuantidade(id: number, delta: number): void { this.carrinho.alterarQuantidade(id, delta); }
  remover(id: number): void { this.carrinho.remover(id); }
  limpar(): void { this.carrinho.limpar(); this.mensagemCupom = ''; }

  aplicarCupom(codigo: string): void {
    if (this.carrinho.aplicarCupom(codigo)) {
      this.mensagemCupom = '';
    } else {
      this.mensagemCupom = codigo.trim() ? 'Cupom inválido ou expirado.' : 'Digite o código do cupom.';
    }
  }

  removerCupom(): void {
    this.carrinho.cupomAplicado = null;
    this.mensagemCupom = '';
  }

  finalizar(): void {
    if (this.carrinho.maiorDeIdade && this.carrinho.itens.length > 0) this.router.navigate(['/checkout']);
  }
}
