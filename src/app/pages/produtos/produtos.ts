import { Component, computed, inject } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProductCard } from '../../components/product-card/product-card';
import { HeaderComponent } from '../../components/header/header.component';

import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';


@Component({
  selector: 'app-produtos',
  imports: [HeaderComponent, ProductCard],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos {
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Vinho Tinto Reservado',
      categoria: 'Vinhos',
      preco: 49.90,
      estoque: 20,
      imagem: 'imgs/produtos/vinho.png',
      descricao: 'Vinho tinto nacional de sabor marcante.'
    },
    {
      id: 2,
      nome: 'Cerveja Black Princess',
      categoria: 'Cervejas',
      preco: 6.99,
      estoque: 50,
      imagem: 'imgs/produtos/cerveja.png',
      descricao: 'Cerveja premium de sabor equilibrado.'
    },
    {
      id: 3,
      nome: 'Whisky Black Label',
      categoria: 'Destilados',
      preco: 169.90,
      estoque: 10,
      imagem: 'imgs/produtos/whisky.png',
      descricao: 'Whisky Black Label envelhecido por 12 anos.'
    }
  ];

  private rota = inject(ActivatedRoute);

  categoria = toSignal(
    this.rota.paramMap.pipe(map(p => p.get('categoria'))),
    { initialValue: null }
  );

  busca = toSignal(
    this.rota.queryParamMap.pipe(map(p => p.get('busca'))),
    { initialValue: null }
  );

  private limpar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  produtosFiltrados = computed(() => {
    const cat = this.categoria();
    const termo = this.busca();

    return this.produtos.filter(p => {
      const daCategoria = !cat || this.limpar(p.categoria) === this.limpar(cat);
      const doTermo = !termo || this.limpar(p.nome + ' ' + p.descricao).includes(this.limpar(termo));
      return daCategoria && doTermo;
    });
  });
}