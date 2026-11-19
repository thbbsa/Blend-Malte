import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-lista',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css',
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];
  carregando = true;
  erro = '';

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.produtoService.listar().subscribe({
      next: (lista) => {
        this.produtos = lista;
        this.carregando = false;
      },
      error: () => {
        this.erro =
          'Não foi possível carregar os produtos. Verifique se o json-server está rodando (npm run api).';
        this.carregando = false;
      },
    });
  }

  excluir(produto: Produto): void {
    if (!produto.id) return;
    if (!confirm(`Deseja realmente excluir "${produto.nome}"?`)) return;

    this.produtoService.excluir(produto.id).subscribe({
      next: () => this.carregar(),
      error: () => (this.erro = 'Erro ao excluir o produto.'),
    });
  }
}
