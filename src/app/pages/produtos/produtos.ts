import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProductCard } from '../../components/product-card/product-card';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { ProdutoService } from '../../services/produto.service';
import { mensagemErro } from '../../services/erro-api';

@Component({
  selector: 'app-produtos',
  imports: [HeaderComponent, Footer, ProductCard],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos {
  produtos: Produto[] = [];
  erro = '';
  carregando = true;
  private rota = inject(ActivatedRoute);
  private detector = inject(ChangeDetectorRef);
  private categoriaAtual = '';
  private buscaAtual = '';

  constructor(produtoService: ProdutoService) {
    this.rota.paramMap.subscribe(parametros => {
      this.categoriaAtual = parametros.get('categoria') ?? '';
      this.detector.markForCheck();
    });
    this.rota.queryParamMap.subscribe(parametros => {
      this.buscaAtual = parametros.get('busca') ?? '';
      this.detector.markForCheck();
    });
    produtoService.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
        this.carregando = false;
        this.detector.markForCheck();
      },
      error: error => {
        this.erro = mensagemErro(error, 'Não foi possível carregar os produtos.');
        this.carregando = false;
        this.detector.markForCheck();
      },
    });
  }

  private limpar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  produtosFiltrados(): Produto[] {
    return this.produtos.filter(produto => {
      const daCategoria = !this.categoriaAtual || this.limpar(produto.categoria) === this.limpar(this.categoriaAtual);
      const doTermo = !this.buscaAtual || this.limpar(produto.nome + ' ' + produto.descricao).includes(this.limpar(this.buscaAtual));
      return daCategoria && doTermo;
    });
  }
}
