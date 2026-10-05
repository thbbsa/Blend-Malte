import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { carrinho } from '../../models/loja';
import { Produto } from '../../models/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  carrinho = carrinho;
  @Input({ required: true }) produto!: Produto;
}
