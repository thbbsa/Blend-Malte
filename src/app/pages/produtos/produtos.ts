import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CATALOGO } from '../../models/catalogo';
import { ProductCard } from '../../components/product-card/product-card';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-produtos',
  imports: [HeaderComponent, Footer, ProductCard],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos {
  produtos = CATALOGO;
  private router = inject(Router);

  private limpar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  produtosFiltrados() {
    // Lê a URL atual a cada atualização da tela, inclusive ao mudar de categoria.
    const url = this.router.parseUrl(this.router.url);
    const segmentos = url.root.children['primary']?.segments;
    const categoria = segmentos && segmentos.length > 1 ? segmentos[1].path : '';
    const busca = url.queryParams['busca'] || '';
    return this.produtos.filter(produto => {
      const daCategoria = !categoria || this.limpar(produto.categoria) === this.limpar(categoria);
      const doTermo = !busca || this.limpar(produto.nome + ' ' + produto.descricao).includes(this.limpar(busca));
      return daCategoria && doTermo;
    });
  }
}
