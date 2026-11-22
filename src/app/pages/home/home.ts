import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { mensagemErro } from '../../services/erro-api';

@Component({
  imports: [HeaderComponent, ProductCard, Footer, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  produtos: Produto[] = [];
  erro = '';
  carregando = true;
  private detector = inject(ChangeDetectorRef);

  get produtosDestaque(): Produto[] {
    return this.produtos.slice(0, 4);
  }

  constructor(produtosService: ProdutoService) {
    produtosService.listar().subscribe({
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
}
