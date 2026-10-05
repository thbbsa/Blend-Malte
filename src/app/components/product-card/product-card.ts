import { Component, input, inject } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly carrinho = inject(CarrinhoService);
  produto = input.required<Produto>();
}
